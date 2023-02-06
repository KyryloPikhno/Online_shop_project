const {Order, DeviceList} = require("../models");
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



        // const userOrderList = await Order.find({user: req.params.userId})
        //     .populate({
        //         path: 'deviceList', populate: {
        //             path: 'device', populate: 'category'
        //         }
        //     }).sort({'dateOrdered': -1});
        //
        // if (!userOrderList) {
        //     res.status(500).json({success: false})
        // }

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
                device: orderItem.device
            })

            return res._id
        }));

        const totalPrices = await Promise.all(devicesIds.map(async (_id) => {
            const orderItem = await DeviceList.findById({_id}).populate('device', 'price');
            return await orderItem.device.price * orderItem.quantity;
        }))

        const totalPrice = await totalPrices.reduce((acc, item) => acc + item, 0);

        const order = await Order.create({
            user: orderInfo.user,
            totalPrice,
            orderStatus: false,
            phone: orderInfo.phone,
            city: orderInfo.city,
            zip: orderInfo.zip,
            address: orderInfo.address,
            country: orderInfo.country,
            deviceList: devicesIds,
        })

        return order
    },

    getCount: async (filter ={}) => {
        const orderCount = Order.countDocuments({})

        if (!orderCount) {
            throw new ApiError('Unsuccessful', 500);
        }

        return orderCount
    },

    updateOne: async (orderId, newInfo) => {
        return Order.findByIdAndUpdate(orderId, newInfo, {new: true})
    },

    deleteOne: async (userId) => {
        return Order.deleteOne({_id: orderId})
    }
};