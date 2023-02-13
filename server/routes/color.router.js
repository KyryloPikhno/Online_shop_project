const router = require('express').Router();

const {colorController} = require("../controllers");
const {authMiddleware, userMiddleware, colorMiddleware} = require("../middlewares");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    colorMiddleware.checkIsColorsExist,
    colorController.getAll
);

router.post(
    '/',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    colorMiddleware.checkIsBodyValid,
    colorController.create
);

router.get(
    '/:colorId',
    authMiddleware.checkAssessToken,
    colorMiddleware.checkIsColorExistsById,
    colorController.getById
);

router.put(
    '/:colorId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    colorMiddleware.checkIsColorExistsForUpdate,
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