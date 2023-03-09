const {Order, DeviceList, Device} = require("../models");
const {ApiError} = require("../errors");


module.exports = {
    findByParams: async (filter = {}) => {
        return Order.find(filter)
            .populate('user', 'name')
            .populate({
                path: 'deviceList', populate: {
                    path: 'device', populate: 'category'
                }
            })
            .sort({'dateOrdered': -1});
    },

    findOneByParams: async (filter = {}) => {
        const order = Order.findById(filter)
            .populate('user')
            .populate({
                path: 'deviceList', populate: {
                    path: 'device', populate: 'category'
                }
            });

        if (!order) {
            throw new ApiError('Order not found', 500);
        }

        return order
    },

    create: async (orderInfo) => {
        const devicesIds = await Promise.all(orderInfo.deviceList.map(async (orderItem) => {
            const res = await DeviceList.create({
                quantity: Number(orderItem.quantity),
                device: orderItem.device,
                price: Number(orderItem.price),
            })

            const device = await Device.findById({_id: orderItem.device});
            const newCountInStock = await device.countInStock - orderItem.quantity;

            if (newCountInStock < 0) {
                throw new ApiError('Device countInStock cannot be less than zero!', 400);
            } else {
                await Device.findOneAndUpdate({_id: orderItem.device}, {countInStock: newCountInStock});
            }

            return res._id
        }));

        const totalPrices = await Promise.all(devicesIds.map(async (_id) => {
            const orderItem = await DeviceList.findById({_id}).populate('device', 'price');
            return await orderItem.price * orderItem.quantity;
        }))

        const totalPrice = await totalPrices.reduce((acc, item) => acc + item, 0);

        return await Order.create({
            user: orderInfo.user,
            totalPrice: totalPrice,
            orderStatus: false,
            deviceList: devicesIds,
        })
    },

    getCount: async (filter = {}) => {
        const orderCount = Order.countDocuments({});

        if (!orderCount) {
            throw new ApiError('Unsuccessful', 500);
        }

        return orderCount
    },

    updateOne: async (orderId, orderInfo) => {
        return Order.findOneAndUpdate(
            orderId, {
                phone: orderInfo.phone,
                country: orderInfo.country,
                city: orderInfo.city,
                zip: Number(orderInfo.zip),
                address: orderInfo.address,
                orderStatus: orderInfo.status,
            },
            {new: true}
        );
    },

    deleteOne: async (userId) => {
        return Order.deleteOne({_id: orderId})
    }
};