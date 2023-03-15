const {User} = require("../models");


module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter).populate('order');
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter).populate('order');
    },

    create: async (userInfo) => {
        return User.create(userInfo);
    },

    updateOne: async (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo, {new: true});
    },

    deleteOne: async (userId) => {
        return User.deleteOne({_id: userId});
    }
};
