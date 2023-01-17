const router = require('express').Router();

const {deviceController} = require("../controllers");
const {authMiddleware, fileMiddleware} = require("../middlewares");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    deviceController.getAll
);

router.post('/', fileMiddleware.single('deviceIMG'), deviceController.create);

router.put('/:deviceId', deviceController.update);

router.delete('/:deviceId', deviceController.delete);

module.exports = router;