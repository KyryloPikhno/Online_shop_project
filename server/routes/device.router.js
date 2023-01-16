const router = require('express').Router();

const {deviceController} = require("../controllers");
const {authMiddleware} = require("../middlewares");


router.get(
    '/',
    authMiddleware.checkAssessToken,
    deviceController.getAll
);

router.post('/',  deviceController.create);

router.put('/:deviceId', deviceController.update);

router.delete('/:deviceId', deviceController.delete);

module.exports = router;