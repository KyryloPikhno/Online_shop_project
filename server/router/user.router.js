const router = require("express").Router();

const controller = require("../controller/user.controller");
const mdlwr = require("../middleware/user.middleware");

router.get('/', controller.getAllUsers);

router.put('/:userId',mdlwr.isUserIdValid,
    mdlwr.isEditUserValid,
    mdlwr.getUserDynamically('userId', 'params', '_id'),
    controller.updateUser, controller.update);


module.exports = router;