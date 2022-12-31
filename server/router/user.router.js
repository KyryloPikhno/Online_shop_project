const router = require("express").Router();

const controller = require("../controller/user.controller");



router.get('/', controller.getAllUsers);

router.post('/', controller.createUser);



module.exports = router;