const User = require("../dataBase/User");


module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getByID:async (req, res, next) => {
        try {
            if(req.user.id=== req.params.id||req.user.isAdmin){

            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
};