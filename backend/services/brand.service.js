const {Brand} = require("../models");


module.exports = {
    findByParams: (filter = {}) => {
        return Brand.find(filter).sort({ name: 1 }).exec();
    },

    findOneByParams: (filter = {}) => {
        return Brand.findOne(filter);
    },

    create: (brandInfo) => {
        return Brand.create(brandInfo);
    },

    updateOne: async (brandId, newInfo) => {
        return Brand.findByIdAndUpdate(brandId, newInfo, {new: true});
    },

    deleteOne: (brandId) => {
        return Brand.deleteOne({_id: brandId});
    }
};
