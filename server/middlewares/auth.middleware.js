const {Auth, ActionToken} = require("../models");
const {FORGOT_PASSWORD} = require("../configs/tokenActionEnum");
const {tokenTypeEnum} = require("../enum");
const {authService} = require("../services");
const {ApiError} = require("../errors");


module.exports = {
    checkAssessToken: async (req, res, next) => {
        try {
            const accessTokenBearer = req.get('Authorization')

            const accessToken = accessTokenBearer.replace('Bearer ', '')

            if (!accessToken) {
                res.status(401).json('No accessToken')
            }

            authService.checkToken(accessToken)

            const tokenInfo = await Auth.findOne({accessToken})

            if (!tokenInfo) {
                res.status(401).json('Token is not valid')
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

    decryptionAccessToken: async (req, res, next) => {
        try {
            const accessTokenBearer = req.get('Authorization')

            const accessToken = accessTokenBearer.replace('Bearer ', '')

            if (!accessToken) {
                res.status(401).json('No accessToken')
            }

            const userInfo = authService.checkToken(accessToken)

            if(!userInfo){
                res.status(40).json('No user')
            }

            req.userInfo = userInfo

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization')

            if (!actionToken) {
                throw new ApiError('No actionToken', 401);
            }

            authService.checkActionToken(actionToken, FORGOT_PASSWORD)

            const tokenInfo = await ActionToken
                .findOne({token: actionToken, tokenType: FORGOT_PASSWORD})
                .populate('_user_id')

            if (!tokenInfo) {
                throw new ApiError('token is not valid', 401);
            }

            req.user = tokenInfo._user_id

            next();
        } catch (e) {
            next(e);
        }
    },
};