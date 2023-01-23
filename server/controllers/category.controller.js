const {Category} = require("../models");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const categories = await Category.find({});

            res.status(200).json(categories);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const category = await Category.findById({_id: req.params.categoryId});

            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const category = await Category.create(req.body);

            res.status(201).json(category)
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const category = await Category.findByIdAndUpdate(req.params.categoryId, {
                    name: req.body.name
                },
                {new: true}
            );

            res.status(201).json(category)
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await Category.deleteOne(req.params.categoryId)

            res.status(204)
        } catch (e) {
            next(e);
        }
    },
};