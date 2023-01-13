const {authService, userService, orderService} = require("../services");
const {Auth} = require("../models");


module.exports = {
    registration: async (req, res, next) => {
        try {
            const hashPassword = await authService.hashPassword(req.body.password);

            const user = await userService.create({...req.body, password: hashPassword})

            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    },

    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await authService.comparePasswords(user.password, body.password);

            const tokenPair = authService.generateAccessTokenPair({id: user._id});

            await Auth.create({...tokenPair, _user_id: user._id})

            res.json({user, ...tokenPair})
        } catch (e) {
            next(e);
        }
    }
};