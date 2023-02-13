const {ApiError} = require("../errors");
const {orderService} = require("../services");
const {newOrderValidator} = require("../validators/order.validator");


module.exports = {
    checkIsOrdersExist: async (req, res, next) => {
        try {
            const orders = await orderService.findByParams({})

            if (!orders) {
                throw new ApiError('Orders not found', 404);
            }

            req.orders = orders

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsOrderExistsForUpdate: async (req, res, next) => {
        try {
            const order = await orderService.updateOne(req.params.orderId, req.body.status)

            req.order = order

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsOrderExistsById: async (req, res, next) => {
        try {
            const order = await orderService.findOneByParams(req.params.orderId)

            if (!order) {
                throw new ApiError('Order by id not found', 404);
            }

            req.order = order

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBodyValid: async (req, res, next) => {
        try {
            let validate = newOrderValidator.validate(req.body);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const order = await orderService.create(req.body)

            if (!order) {
                throw new ApiError('Order is not created', 400);
            }

            req.body = validate.value;

            req.order = order;

            next()
        } catch (e) {
            next(e)
        }
    },

    checkIsUserOrdersExist: async (req, res, next) => {
        try {

            const userOrderList = await orderService.findByParams({user: req.params.userId})

            if (!userOrderList) {
                throw new ApiError('Order is not defined', 404);
            }

            req.userOrderList = userOrderList;
            next()
        } catch (e) {
            next(e)
        }
    }
};

