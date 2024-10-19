const { commonValidator } = require("../validators/common.validator")
const { colorService } = require("../services")
const { ApiError } = require("../errors")

module.exports = {
  checkIsColorsExist: async (req, res, next) => {
    try {
      const colors = await colorService.findByParams({})

      if (!colors) {
        throw new ApiError("Colors not found", 404)
      }

      req.colors = colors

      next()
    } catch (e) {
      next(e)
    }
  },

  checkIsColorExistsForUpdate: async (req, res, next) => {
    try {
      const validate = commonValidator.validate({ name: req.body.color })

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      const color = await colorService.updateOne(req.params.colorId, req.body.status)

      if (!color) {
        throw new ApiError("Color by id not found", 404)
      }

      req.color = color

      next()
    } catch (e) {
      next(e)
    }
  },

  checkIsColorExistsById: async (req, res, next) => {
    try {
      const color = await colorService.findOneByParams(req.params.colorId)

      if (!color) {
        throw new ApiError("Order by id not found", 404)
      }

      req.color = color

      next()
    } catch (e) {
      next(e)
    }
  },

  checkIsBodyValid: async (req, res, next) => {
    try {
      const validate = commonValidator.validate({ name: req.body.color })

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      const color = await colorService.create({ name: req.body.color })

      if (!color) {
        throw new ApiError("Color is not created", 400)
      }

      req.body = validate.value

      req.color = color

      next()
    } catch (e) {
      next(e)
    }
  },
}
