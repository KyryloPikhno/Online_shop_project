const router = require('express').Router();

const {authMiddleware, userMiddleware} = require("../middlewares");
const {brandController} = require("../controllers");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    brandController.getAll
);


router.post(
    '/',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    brandController.create
);

router.get(
    '/:brandId',
    authMiddleware.checkAssessToken,
    brandController.getById
);

router.put(
    '/:brandId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    brandController.update
);

router.delete(
    '/:brandId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    brandController.delete
);

module.exports = router;