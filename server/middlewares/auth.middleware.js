const {ApiError} = require("../errors");
const {authService} = require("../services");
const {tokenTypeEnum} = require("../enum");
const {Auth} = require("../models");


module.exports = {
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization')

            if (!refreshToken) {
                throw new ApiError('No refreshToken', 401);
            }

            authService.checkToken(refreshToken, tokenTypeEnum.refreshToken)

            const tokenInfo = await Auth.findOne({refreshToken})

            if (!tokenInfo) {
                throw new ApiError('token is not valid', 401);
            }

            req.tokenInfo = tokenInfo

            next();
        } catch (e) {
            next(e);
        }
    },
};