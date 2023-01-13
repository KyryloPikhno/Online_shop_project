const {User} = require("../models");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        }catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const user = await User.create(req.body)

            res.status(201).json(user)
        } catch (e) {
            next(e);
        }
    },
};
