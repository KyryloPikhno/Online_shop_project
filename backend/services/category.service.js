const {Category} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return Category.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return Category.findOne(filter);
    },

    create: async (categoryInfo) => {
        return Category.create(categoryInfo);
    },

    updateOne: async (categoryId, newInfo) => {
        return Category.findByIdAndUpdate(categoryId, newInfo, {new: true});
    },

    deleteOne: async (categoryId) => {
        return Category.deleteOne({_id: categoryId});
    }
};