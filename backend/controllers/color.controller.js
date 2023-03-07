const {colorService} = require("../services");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            res.status(200).json(req.colors);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            res.status(200).json(req.color);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            res.status(201).json(req.color)
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            res.status(201).json(req.color)
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await colorService.deleteOne(req.params.colorId)

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    },
};