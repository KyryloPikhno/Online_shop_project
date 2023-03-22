const {User} = require("../models");


module.exports = {
    findByParams: (filter = {}) => {
        return User.find(filter).populate('order').select('name email isAdmin createdAt updatedAt');
    },

    findOneByParams: (filter = {}) => {
        return User.findOne(filter).populate('order').select('name email isAdmin createdAt updatedAt');
    },

    create: async (userInfo) => {
        const user = await User.create(userInfo);

        return User.findOne({_id: user._id}).select('name email isAdmin createdAt updatedAt')
    },

    updateOne: (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo, {new: true}).select('name email isAdmin createdAt updatedAt');
    },

    deleteOne: (userId) => {
        return User.deleteOne({_id: userId}).select('name email isAdmin createdAt updatedAt');
    }
};
