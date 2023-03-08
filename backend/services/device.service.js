const {Device} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return Device.find(filter)
            .populate('category')
            .populate('brand')
            .populate('color');
    },

    findOneByParams: async (filter = {}) => {
        return Device.findOne(filter)
            .populate('category')
            .populate('brand')
            .populate('color');
    },

    create: async (deviceInfo) => {
        return Device.create(deviceInfo)
    },

    addImages: async (deviceId, images) => {
        return Device.findOneAndUpdate(
            {_id: deviceId},
            {$push: {images}},
            {new: true}
        )
    },

    deleteImage: async (deviceId, fileName) => {
        return Device.findOneAndUpdate(
            {_id: deviceId},
            {$pull: {images: fileName}},
            {new: true}
        )
    },

    updateOne: async (deviceId, newInfo) => {
        return Device.findByIdAndUpdate(
            deviceId,
            newInfo,
            {new: true}
        )
    },

    updateOneByParams: async ({deviceId, newInfo}) => {
        return Device.findByIdAndUpdate(
            deviceId,
            newInfo,
            {new: true}
        )
    },

    deleteOne: async (deviceId) => {
        return Device.deleteOne({_id: deviceId})
    }
};