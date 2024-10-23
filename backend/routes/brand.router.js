const router = require("express").Router()

const { brandController } = require("../controllers")
const { authMiddleware, userMiddleware, brandMiddleware } = require("../middlewares")

router.get("/", brandMiddleware.checkIsBrandsExist, brandController.getAll)

router.post(
  "/",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  brandMiddleware.checkIsBodyValid,
  brandController.create,
)

router.get(
  "/:brandId",
  authMiddleware.checkAssessToken,
  brandMiddleware.checkIsBrandExistsById,
  brandController.getById,
)

router.put(
  "/:brandId",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  brandMiddleware.checkIsBrandExistsForUpdate,
  brandController.update,
)

router.delete(
  "/:brandId",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  brandController.delete,
)

module.exports = router
