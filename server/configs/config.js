module.exports={
    PORT: process.env.PORT || 5400,
    DB_NAME: process.env.DB_NAME || 'test',
    DB_PASSWORD: process.env.DB_PASSWORD || 'test',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWord',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWord',

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'CAATS',
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'FPAS'
}