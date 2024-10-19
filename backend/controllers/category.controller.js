const { categoryService } = require("../services")

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.status(200).json(req.categories)
    } catch (e) {
      next(e)
    }
  },

  getById: async (req, res, next) => {
    try {
      res.status(200).json(req.category)
    } catch (e) {
      next(e)
    }
  },

  create: async (req, res, next) => {
    try {
      res.status(201).json(req.category)
    } catch (e) {
      next(e)
    }
  },

  update: async (req, res, next) => {
    try {
      res.status(201).json(req.category)
    } catch (e) {
      next(e)
    }
  },

  delete: async (req, res, next) => {
    try {
      await categoryService.deleteOne(req.params.categoryId)

      res.sendStatus(204)
    } catch (e) {
      next(e)
    }
  },
}
