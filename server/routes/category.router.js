const router = require('express').Router();

const {categoryController} = require("../controllers");
const {authMiddleware, userMiddleware} = require("../middlewares");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    categoryController.getAll
);

router.post(
    '/',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    categoryController.create
);

router.get(
    '/:categoryId',
    authMiddleware.checkAssessToken,
    categoryController.getById
);

router.put(
    '/:categoryId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    categoryController.update
);

router.delete(
    '/:categoryId',
    authMiddleware.checkAssessToken,
    authMiddleware.decryptionAccessToken,
    userMiddleware.isAdmin,
    categoryController.delete
);

module.exports = router;