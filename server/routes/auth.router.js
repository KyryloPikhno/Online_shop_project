const router = require('express').Router();

const{authController} = require('../controllers')
const {userMiddlemare} = require("../middlewares");


router.post(
    '/login',
    userMiddlemare.getUserDynamically,
    authController.login
);

module.exports = router;