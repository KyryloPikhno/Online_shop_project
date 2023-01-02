const router = require("express").Router();

const controller = require("../controller/user.controller");
const authMdlwr = require("../middleware/auth.middleware");


router.put('/:id',authMdlwr.verifyTokenAndAuth, controller.getAllUsers);


module.exports = router;