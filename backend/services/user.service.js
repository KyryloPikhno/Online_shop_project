const {User} = require("../models");


module.exports = {
    findByParams: (filter = {}) => {
        return User.find(filter).populate('order').select('name email isAdmin createdAt updatedAt');
    },

    findOneByParams: (filter = {}) => {
        return User.findOne(filter).populate('order').select('name email isAdmin createdAt updatedAt');
    },

    create: (userInfo) => {
        return User.create(userInfo).select('name email isAdmin createdAt updatedAt');
    },

    updateOne: (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo, {new: true}).select('name email isAdmin createdAt updatedAt');
    },

    deleteOne: (userId) => {
        return User.deleteOne({_id: userId}).select('name email isAdmin createdAt updatedAt');
    }
};
