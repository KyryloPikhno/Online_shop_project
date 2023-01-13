const router = require('express').Router();

const {authController} = require('../controllers');
const {userMiddleware} = require('../middlewares');


router.post(
    '/registration',
    userMiddleware.checkForUniqueness('email'),
    authController.registration
);

router.post(
    '/login',
    userMiddleware.getUserDynamically('email'),
    authController.login
);

module.exports = router;