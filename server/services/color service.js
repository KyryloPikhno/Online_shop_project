const {Color} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return Color.find(filter)
    },

    findOneByParams: async (filter = {}) => {
        return Color.findOne(filter)
    },

    create: async (colorInfo) => {
        return Color.create(colorInfo)
    },

    updateOne: async (colorId, newInfo) => {
        return Color.findByIdAndUpdate(colorId, newInfo, {new: true})
    },

    deleteOne: async (colorId) => {
        return Color.deleteOne({_id: colorId})
    }
};