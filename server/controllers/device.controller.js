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

    create: async (req, res, next) => {
        try {
            const file = req.file;

            if(!file) return res.status(400).send('No image in the request')

            const fileName = file.filename

            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

            let product = await deviceService.create({
                name: req.body.name,
                img: `${basePath}${fileName}`,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
            })

            if(!product)
                return res.status(500).send('The product cannot be created')

            res.status(201).json(product)
        } catch (e) {
            next(e);
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
            const device = await deviceService.deleteOne(req.params.deviceId)

            res.status(204).send(device)
        } catch (e) {
            next(e);
        }
    },
};
