const router = require('express').Router();

const {deviceController} = require("../controllers");
const {authMiddleware, userMiddleware, fileMiddleware} = require("../middlewares");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    deviceController.getAll
);

router.get(
    '/:deviceId',
    authMiddleware.checkAssessToken,
    deviceController.getById
);

router.post(
    '/',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    deviceController.create
);

router.put(
    '/uploadImage/:deviceId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    fileMiddleware.array('image', 3),
    deviceController.uploadImages
);

router.put(
    "/removeImage/:deviceId",
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    deviceController.removeImage
);

router.put(
    '/:deviceId',
    authMiddleware.checkAssessToken,
    deviceController.update
);

router.delete(
    '/:deviceId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    deviceController.delete
);

module.exports = router;