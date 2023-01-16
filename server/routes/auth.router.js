const router = require('express').Router();

const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');


router.post(
    '/registration',
    userMiddleware.checkIsEmailUnique,
    authController.registration
);

router.post(
    '/login',
    userMiddleware.getUserDynamically('email'),
    authController.login
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/account',
    authMiddleware.decryptionAccessToken,
    authController.account
);

module.exports = router;