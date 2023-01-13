const {authService} = require("../services");
const {Auth} = require("../models");


module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await authService.comparePasswords(user.password, body.password);

            const tokenPair = authService.generateAccessTokenPair({id: user._id});

            await Auth.create({...tokenPair, _user_id: user._id})
        } catch (e) {
            next(e);
        }
    }
};