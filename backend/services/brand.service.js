const {Brand} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return Brand.find(filter)
    },

    findOneByParams: async (filter = {}) => {
        return Brand.findOne(filter)
    },

    create: async (brandInfo) => {
        return Brand.create(brandInfo)
    },

    updateOne: async (brandId, newInfo) => {
        return Brand.findByIdAndUpdate(brandId, newInfo, {new: true})
    },

    deleteOne: async (brandId) => {
        return Brand.deleteOne({_id: brandId})
    }
};
