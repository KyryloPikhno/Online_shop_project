const {Color} = require("../models");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const colors = await Color.find({});

            res.status(200).json(colors);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const color = await Color.findById({_id: req.params.colorId});

            res.status(200).json(color);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const color = await Color.create({name:req.body.color});

            res.status(201).json(color)
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const color = await Color.findByIdAndUpdate(req.params.colorId, {
                    name: req.body.name
                },
                {new: true}
            );

            res.status(201).json(color)
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await Color.deleteOne(req.params.colorId)

            res.status(204)
        } catch (e) {
            next(e);
        }
    },
};