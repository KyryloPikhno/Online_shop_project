const router = require("express").Router()

const { userController } = require("../controllers")

router.get("/", userController.getAll)

router.post("/", userController.create)

router.get("/:userId", userController.getById)

router.put("/:userId", userController.update)

router.delete("/:userId", userController.delete)

module.exports = router
