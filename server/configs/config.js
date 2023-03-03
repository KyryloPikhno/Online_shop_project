require('dotenv').config();


module.exports = {
    PORT: process.env.PORT || 4000,
    DB_NAME: process.env.DB_NAME || 'online_shop',
    DB_PASSWORD: process.env.DB_PASSWORD || 'test',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'test',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'test',

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'test',
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'test',

    CLOUD_NAME: process.env.CLOUD_NAME || 'test',
    API_KAY: process.env.API_KAY || 1234,
    API_SECRET: process.env.API_SECRET || 5678,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
};