require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5400,
    DB_NAME: process.env.DB_NAME || 'test',
    DB_PASSWORD: process.env.DB_PASSWORD || 'test',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'test',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'test',

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'test',
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'test'
};