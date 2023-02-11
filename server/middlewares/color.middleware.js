const {ApiError} = require("../errors");
const {colorService} = require("../services");


module.exports = {
    checkIsColorsExist: async (req, res, next) => {
        try {
            const colors = await colorService.findByParams({})

            if (!colors) {
                throw new ApiError('Colors not found', 404);
            }

            req.colors = colors

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsColorExistsForUpdate: async (req, res, next) => {
        try {
            const color = await colorService.updateOne(req.params.colorId, req.body.status)

            if (!color) {
                throw new ApiError('Color by id not found', 404);
            }

            req.color = color

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsColorExistsById: async (req, res, next) => {
        try {
            const color = await colorService.findOneByParams(req.params.colorId)

            if (!color) {
                throw new ApiError('Order by id not found', 404);
            }

            req.color = color

            next();
        } catch (e) {
            next(e);
        }
    }
};
