const {ApiError} = require("../errors");
const {categoryService} = require("../services");


module.exports = {
    checkIsColorsExist: async (req, res, next) => {
        try {
            const categories = await categoryService.findByParams({})

            if (!categories) {
                throw new ApiError('Categories not found', 404);
            }

            req.colors = categories

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsCategoryExistsForUpdate: async (req, res, next) => {
        try {
            const category = await categoryService.updateOne(req.params.categoryId, req.body.status)

            if (!category) {
                throw new ApiError('Category by id not found', 404);
            }

            req.category = category

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsCategoryExistsById: async (req, res, next) => {
        try {
            const category = await categoryService.findOneByParams(req.params.categoryId)

            if (!category) {
                throw new ApiError('Category by id not found', 404);
            }

            req.category = category

            next();
        } catch (e) {
            next(e);
        }
    }
};