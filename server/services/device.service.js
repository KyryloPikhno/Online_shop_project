const {Device} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return Device.find(filter)
    },

    findOneByParams: async (filter = {}) => {
        return Device.findOne(filter)
    },

    create: async (deviceInfo) => {
        return Device.create(deviceInfo)
    },

    updateOne: async (deviceId, newInfo) => {
        return Device.findByIdAndUpdate(deviceId, newInfo, {new: true})
    },

    deleteOne: async (deviceId) => {
        return Device.deleteOne({_id: deviceId})
    }
};