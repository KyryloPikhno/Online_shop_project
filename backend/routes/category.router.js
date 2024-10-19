const router = require("express").Router()

const { categoryController } = require("../controllers")
const { authMiddleware, userMiddleware, categoryMiddleware } = require("../middlewares")

router.get("/", categoryMiddleware.checkIsCategoriesExist, categoryController.getAll)

router.post(
  "/",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  categoryMiddleware.checkIsBodyValid,
  categoryController.create,
)

router.get(
  "/:categoryId",
  authMiddleware.checkAssessToken,
  categoryMiddleware.checkIsCategoryExistsById,
  categoryController.getById,
)

router.put(
  "/:categoryId",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  categoryMiddleware.checkIsCategoryExistsForUpdate,
  categoryController.update,
)

router.delete(
  "/:categoryId",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  categoryController.delete,
)

module.exports = router
