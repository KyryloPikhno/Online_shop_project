const {Brand} = require("../models");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            res.status(200).json(req.brands);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const brand = await Brand.findById({_id: req.params.brandId});
cd
            res.status(200).json(brand);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const brand = await Brand.create({name: req.body.brand});

            res.status(201).json(brand)
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const brand = await Brand.findByIdAndUpdate(req.params.brandId, {
                    name: req.body.name
                },
                {new: true}
            );

            res.status(201).json(brand)
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await Brand.deleteOne(req.params.brandId)

            res.status(204)
        } catch (e) {
            next(e);
        }
    },
};