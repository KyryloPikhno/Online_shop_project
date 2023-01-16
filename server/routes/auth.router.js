const router = require('express').Router();

const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');


router.post(
    '/registration',
    // userMiddleware.checkForUniqueness('email'),
    userMiddleware.checkIsEmailUnique,
    // userMiddleware.isNewUserValid,
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

module.exports = router;