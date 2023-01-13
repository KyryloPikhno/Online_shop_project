const router = require('express').Router();

const {userController} = require("../controllers");


router.get('/', userController.getAll);
router.post('/',  userController.create);

module.exports = router;
