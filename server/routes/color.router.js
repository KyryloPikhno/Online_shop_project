const router = require('express').Router();

const {colorController} = require("../controllers");
const {authMiddleware, userMiddleware} = require("../middlewares");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    colorController.getAll
);

router.post(
    '/',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    colorController.create
);

router.get(
    '/:colorId',
    authMiddleware.checkAssessToken,
    colorController.getById
);

router.put(
    '/:colorId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    colorController.update
);

router.delete(
    '/:colorId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    colorController.delete
);

module.exports = router;