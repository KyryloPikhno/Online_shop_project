const {Category} = require("../models");


module.exports = {
    findByParams: (filter = {}) => {
        return Category.find(filter);
    },

    findOneByParams: (filter = {}) => {
        return Category.findOne(filter);
    },

    create: async (categoryInfo) => {
        return Category.create(categoryInfo);
    },

    updateOne: (categoryId, newInfo) => {
        return Category.findByIdAndUpdate(categoryId, newInfo, {new: true});
    },

    deleteOne: (categoryId) => {
        return Category.deleteOne({_id: categoryId});
    }
};