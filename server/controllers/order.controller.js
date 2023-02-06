const {Order, DeviceList, Device} = require("../models");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

            if (!orderList) {
                res.status(500).json({success: false})
            }

            res.status(200).json(orderList);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id)
                .populate('user', 'name')
                .populate({
                    path: 'deviceList', populate: {
                        path: 'device', populate: 'category'
                    }
                });

            if (!order) {
                res.status(500).json({success: false})
            }

            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const devicesIds = await Promise.all(req.body.deviceList.map(async (orderItem) => {
                const res = await DeviceList.create({
                    quantity: orderItem.quantity,
                    product: orderItem.device
                })

                return res._id
            }));

            const totalPrices = await Promise.all(devicesIds.map(async (_id)=>{
                return Device.findById({_id});
                // return orderItem.device.price * orderItem.quantity;
            }))

            res.status(200).json(totalPrices)
        } catch (e) {
            next(e);
        }
    },

    getTotalSales: async (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },

    getCount: async (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },

    getUserOrders: async (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },
};
