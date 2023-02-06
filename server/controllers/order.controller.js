const {Order, DeviceList} = require("../models");


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
                        path : 'device', populate: 'category'}
                });

            if(!order) {
                res.status(500).json({success: false})
            }

            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const devices = Promise.all(req.body.deviceList.map(async item => {
               let res = await DeviceList.create({
                    quantity: item.quantity,
                    device: item.device
                })

                return res._id
            }));


                res.json(devices)
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
