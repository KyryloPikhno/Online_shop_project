const router = require('express').Router();

const {deviceController} = require("../controllers");
const {authMiddleware, userMiddleware, fileMiddleware} = require("../middlewares");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    deviceController.getAll
);

router.post(
    '/',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    fileMiddleware.single('image'),
    deviceController.create
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