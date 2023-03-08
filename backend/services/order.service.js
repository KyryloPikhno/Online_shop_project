const {Order, DeviceList} = require("../models");
const {ApiError} = require("../errors");
const {deviceService} = require("./index");


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
                quantity: orderItem.quantity,
                device: orderItem.device,
                price: orderItem.price,
            })

            // const device = await deviceService.findOneByParams({_id: orderItem.device});
            //
            // const newCountInStock = await device.countInStock - orderItem.quantity;
            //
            // await deviceService.updateOneByParams({_id: device._id, countInStock: newCountInStock});

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
        const orderCount = Order.countDocuments({})

        if (!orderCount) {
            throw new ApiError('Unsuccessful', 500);
        }

        return orderCount
    },

    updateOne: async (orderId, orderInfo) => {
        return Order.findOneAndUpdate(
            orderId, {
                orderStatus: orderInfo.status,
                phone: orderInfo.phone,
                city: orderInfo.city,
                zip: orderInfo.zip,
                address: orderInfo.address,
                country: orderInfo.country,
            },
            {new: true}
        );
    },

    deleteOne: async (userId) => {
        return Order.deleteOne({_id: orderId})
    }
};