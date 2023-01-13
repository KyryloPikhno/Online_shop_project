const {Order} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return Order.find(filter)
    },

    findOneByParams: async (filter = {}) => {
        return Order.findOne(filter)
    },

    create: async (orderInfo) => {
        return Order.create(orderInfo)
    },

    updateOne: async (orderId, newInfo) => {
        return Order.findByIdAndUpdate(orderId, newInfo, {new: true})
    },

    deleteOne: async (userId) => {
        return Order.deleteOne({_id: orderId})
    }
};