const {ApiError} = require("../errors");
const {authService} = require("../services");
const {tokenTypeEnum} = require("../enum");
const {Auth} = require("../models");


module.exports = {
    checkAssessToken: async (req, res, next) => {
        try {
            const accessTokenBearer = req.get('Authorization')

            const accessToken = accessTokenBearer.replace('Bearer ', '')

            if (!accessToken) {
                res.status(401).json('No accessToken')

                // throw new ApiError('No accessToken', 401);
            }

            authService.checkToken(accessToken)

            const tokenInfo = await Auth.findOne({accessToken})

            if (!tokenInfo) {
                res.status(401).json('Token is not valid')
                // throw new ApiError('token is not valid', 401);
            }

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.body.refresh

            if (!refreshToken) {
                res.status(401).json('No refreshToken')
            }

            authService.checkToken(refreshToken, tokenTypeEnum.refreshToken)

            const tokenInfo = await Auth.findOne({refreshToken})

            if (!tokenInfo) {
                res.status(401).json('Token is not valid')
            }

            req.tokenInfo = tokenInfo

            next();
        } catch (e) {
            next(e);
        }
    },
};