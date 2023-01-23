const fs = require("fs");

const {deviceService} = require("../services");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const devices = await deviceService.findByParams({});

            res.status(200).json(devices);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const device = await deviceService.findOneByParams({_id:req.params.deviceId});

            res.status(200).json(device);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const device = await deviceService.create(req.body)

            if (!device)
                return res.status(500).send('The device cannot be created')

            res.status(201).json(device)
        } catch (e) {
            next(e);
        }
    },

    uploadImages: async (req, res, next) => {
        try {
            const images = [];

            req.files.map((file) => {
                images.push(file.filename);
            });

            const device = await deviceService.addImages(req.params.deviceId, images)

            res.status(200).json(device)
        } catch (e) {
            next(e);
        }
    },

    removeImage: async (req, res, next) => {
        try {
            const device = await deviceService.deleteImage(req.params.deviceId, req.body.fileName)

            if (device) {
                fs.unlinkSync(`./uploads/${req.body.fileName}`);
            }

            res.status(200).json(device)
        } catch (e) {
            next(e)
        }
    },

    update: async (req, res, next) => {
        try {
            const newDeviceInfo = req.body;
            const deviceId = req.params.deviceId;

            const device = await deviceService.updateOne(deviceId, newDeviceInfo)

            res.status(201).json(device)
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
             const device = await deviceService.findOneByParams({_id: req.params.deviceId})

             if (device && device.images.length !== 0) {
                device.images.map((file) => {
                    fs.unlinkSync(`./uploads/${file}`);
                });
            }

            await deviceService.deleteOne(req.params.deviceId)

            res.status(204).send('Device removed')
        } catch (e) {
            next(e);
        }
    },
};
