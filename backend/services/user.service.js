const {User} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter).populate('order').select('name email isAdmin');
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter).populate('order').select('name email isAdmin');
    },

    create: async (userInfo) => {
        return User.create(userInfo).select('name email isAdmin');
    },

    updateOne: async (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo, {new: true}).select('name email isAdmin');
    },

    deleteOne: async (userId) => {
        return User.deleteOne({_id: userId}).select('name email isAdmin');
    }
};
