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

            console.log(req.file.path);
            // if(req.file){
            //     res.json(req.file)
            // }
            const device = await deviceService.create({img:req.file.path})

            res.status(201).json(device)
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
