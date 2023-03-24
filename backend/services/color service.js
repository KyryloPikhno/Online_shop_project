const {Color} = require("../models");


module.exports = {
    findByParams: (filter = {}) => {
        return Color.find(filter).sort({ name: 1 }).exec();
    },

    findOneByParams: (filter = {}) => {
        return Color.findOne(filter);
    },

    create: (colorInfo) => {
        return Color.create(colorInfo);
    },

    updateOne: (colorId, newInfo) => {
        return Color.findByIdAndUpdate(colorId, newInfo, {new: true});
    },

    deleteOne: (colorId) => {
        return Color.deleteOne({_id: colorId});
    }
};