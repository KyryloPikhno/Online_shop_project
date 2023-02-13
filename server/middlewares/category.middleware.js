const {categoryService} = require("../services");
const {commonValidator} = require("../validators/common.validator");
const {ApiError} = require("../errors");


module.exports = {
    checkIsCategoriesExist: async (req, res, next) => {
        try {
            const categories = await categoryService.findByParams({})

            if (!categories) {
                throw new ApiError('Categories not found', 404);
            }

            req.categories = categories

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsCategoryExistsForUpdate: async (req, res, next) => {
        try {
            let validate = commonValidator.validate({name: req.body.category});

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const category = await categoryService.updateOne(req.params.categoryId, {name: req.body.category})

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
            const category = await categoryService.findOneByParams({_id: req.params.categoryId})

            if (!category) {
                throw new ApiError('Category by id not found', 404);
            }

            req.category = category

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBodyValid: async (req, res, next) => {
        try {
            const validate = commonValidator.validate({name: req.body.category});

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const category = await categoryService.create({name:req.body.category})

            if (!category) {
                throw new ApiError('Category is not created', 400);
            }

            req.body = validate.value;

            req.category = category;

            next()
        } catch (e) {
            next(e)
        }
    },
};