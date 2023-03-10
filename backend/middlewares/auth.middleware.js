const {FORGOT_PASSWORD} = require("../configs/tokenActionEnum");
const {Auth, ActionToken} = require("../models");
const {authService} = require("../services");
const {tokenTypeEnum} = require("../enum");
const {ApiError} = require("../errors");


module.exports = {
    checkAssessToken: async (req, res, next) => {
        try {
            const accessTokenBearer = req.get('Authorization');

            const accessToken = accessTokenBearer.replace('Bearer ', '');

            if (!accessToken) {
                throw new ApiError('No accessToken', 401);
            }

            authService.checkToken(accessToken);

            const tokenInfo = await Auth.findOne({accessToken});

            if (!tokenInfo) {
                throw new ApiError('Token is not valid', 401);
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.body.refresh;

            if (!refreshToken) {
                throw new ApiError('No refreshToken', 401);
            }

            authService.checkToken(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = await Auth.findOne({refreshToken});

            if (!tokenInfo) {
                throw new ApiError('Token is not valid', 401);
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    decryptionAccessToken: async (req, res, next) => {
        try {
            const accessTokenBearer = req.get('Authorization');

            const accessToken = accessTokenBearer.replace('Bearer ', '');

            if (!accessToken) {
                throw new ApiError('No accessToken', 401);
            }

            const userInfo = authService.checkToken(accessToken);

            if(!userInfo) {
                throw new ApiError('No user', 401);
            }

            req.userInfo = userInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const accessTokenBearer = req.get('Authorization');

            const actionToken = accessTokenBearer.replace('Bearer ', '');

            if (!actionToken) {
                throw new ApiError('No actionToken', 401);
            }

            authService.checkActionToken(actionToken, FORGOT_PASSWORD);

            const tokenInfo = await ActionToken
                .findOne({token: actionToken, tokenType: FORGOT_PASSWORD})
                .populate('_user_id');

            if (!tokenInfo) {
                throw new ApiError('token is not valid', 401);
            }

            req.user = tokenInfo._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },
};