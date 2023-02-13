const {ApiError} = require("../errors");
const {brandService} = require("../services");


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
    }
};