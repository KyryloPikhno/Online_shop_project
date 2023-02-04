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
            const deviceIds = req.body.deviceList.map(async (orderItem) =>{
                let newOrderItem = await DeviceList({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                })

            const orderItemsIdsResolved = deviceIds;

            const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
                const orderDevice = await DeviceList.findById(orderItemId).populate('device', 'price');
                const totalPrice = orderDevice.product.price * orderDevice.quantity;
                return totalPrice
            }))

            const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

            let order = await Order({
                user: req.body.user,
                deviceList: orderItemsIdsResolved,
                phone: req.body.phone,
                address: '',
                city: req.body.city,
                zip: req.body.zip,
                country: req.body.country,
                orderStatus: req.body.status,
                totalPrice: totalPrice,
            })
            // order = await order.save();

            if(!order)
                return res.status(400).send('the order cannot be created!')

            res.status(200).send(order);
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
