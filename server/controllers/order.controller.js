const {Order, DeviceList, Device} = require("../models");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const orders = await Order.find({})
                .populate('user', 'name')
                .sort({'dateOrdered': -1});

            if (!orders) {
                res.status(500).json({success: false})
            }

            res.status(200).json(orders);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.orderId)
                .populate('user')
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
                    device: orderItem.device
                })

                return res._id
            }));

            const totalPrices = await Promise.all(devicesIds.map(async (_id) => {
                const orderItem = await DeviceList.findById({_id}).populate('device', 'price');
                return await orderItem.device.price * orderItem.quantity;
            }))

            const totalPrice = totalPrices.reduce((acc, item) => acc + item, 0);

            const order = await Order.create({
                user: req.body.user,
                totalPrice,
                orderStatus: false,
                phone: req.body.phone,
                city: req.body.city,
                zip: req.body.zip,
                country: req.body.country,
                deviceList: devicesIds,
            })

            if (!order)
                return res.status(400).send('the order cannot be created!')

            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    },

    getCount: async (req, res, next) => {
        try {
            const orderCount = await Order.countDocuments({})

            if (!orderCount) {
                res.status(500).json({success: false})
            }
            res.status(200).json(orderCount)
        } catch (e) {
            next(e);
        }
    },

    getUserOrders: async (req, res, next) => {
        try {
            const userOrderList = await Order.find({user: req.params.userId})
                .populate({
                    path: 'deviceList', populate: {
                        path: 'device', populate: 'category'
                    }
                }).sort({'dateOrdered': -1});

            if (!userOrderList) {
                res.status(500).json({success: false})
            }
            res.status(200).send(userOrderList);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const order = await Order.findOneAndUpdate(
                {_id: req.params.orderId},
                {
                    orderStatus: req.body.status
                },
                {new: true}
            )

            if (!order)
                return res.status(400).send('the order cannot be update!')

            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            Order.findByIdAndRemove(req.params.orderId)
        } catch (e) {
            next(e);
        }
    },
};
