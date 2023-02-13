const {ApiError} = require("../errors");
const {brandService} = require("../services");
const {newBrandValidator} = require("../validators/brand.validator");


module.exports = {
    checkIsBrandsExist: async (req, res, next) => {
        try {
            const brands = await brandService.findByParams({})

            if (!brands) {
                throw new ApiError('Brands not found', 404);
            }

            req.brands = brands

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBrandExistsForUpdate: async (req, res, next) => {
        try {
            let validate = newBrandValidator.validate(req.body);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const brand = await brandService.updateOne(req.params.brandId, {name: req.body.brand})

            if (!brand) {
                throw new ApiError('Brand by id not found', 404);
            }

            req.brand = brand

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBrandExistsById: async (req, res, next) => {
        try {
            const brand = await brandService.findOneByParams({_id: req.params.brandId})

            if (!brand) {
                throw new ApiError('Brand by id not found', 404);
            }

            req.brand = brand

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBodyValid: async (req, res, next) => {
        try {
            const validate = newBrandValidator.validate(req.body);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const brand = await brandService.create({name:req.body.brand})

            if (!brand) {
                throw new ApiError('Brand is not created', 400);
            }

            req.body = validate.value;

            req.brand = brand;

            next()
        } catch (e) {
            next(e)
        }
    },
};