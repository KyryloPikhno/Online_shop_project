const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {ACCESS_SECRET, REFRESH_SECRET, CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET, FORGOT_PASSWORD_ACTION_TOKEN_SECRET} = require("../configs/config");
const {CONFIRM_ACCOUNT, FORGOT_PASSWORD} = require("../configs/tokenActionEnum");
const {tokenTypeEnum} = require("../enum");
const {ApiError} = require("../errors");


module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '1d'});
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '2d'});

        return {accessToken, refreshToken}
    },

    generateActionToken: (actionType, dataToSign = {}) => {
        let secretWord = ''

        switch (actionType) {
            case CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
                break
            case FORGOT_PASSWORD:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
                break
        }

        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'});
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let secret = ''

            if (tokenType === tokenTypeEnum.accessToken) {
                secret = ACCESS_SECRET
            } else if (tokenType === tokenTypeEnum.refreshToken) {
                secret = REFRESH_SECRET
            }

            return jwt.verify(token, secret)
        } catch (e) {
            throw new ApiError('Token not valid', 401)
        }
    },
};