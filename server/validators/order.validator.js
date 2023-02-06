const Joi = require('joi');


module.exports = {
    newOrderValidator: Joi.object({
        deviceList: Joi.array().required(),
        user: Joi.string().lowercase().trim().required(),
        phone: Joi.string().trim().required().min(9).max(15),
        city: Joi.string().trim().required(),
        zip: Joi.number().required(),
        address: Joi.string().required(),
        country: Joi.string().required()
    }),
};