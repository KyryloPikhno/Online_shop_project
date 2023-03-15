const {userService, authService} = require("../services");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.findByParams({});

            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const user = await userService.findOneByParams({_id: req.params.userId});

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const hashPassword = await authService.hashPassword(req.body.password);

            const user = await userService.create({...req.body, password: hashPassword});

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const user = await userService.updateOne(userId, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const user = await userService.deleteOne(req.params.userId);

            res.status(204).send(user);
        } catch (e) {
            next(e);
        }
    },
};
