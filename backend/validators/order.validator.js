const Joi = require('joi');


module.exports = {
    newOrderValidator: Joi.object({
        deviceList: Joi.array().required(),
        user: Joi.string().required(),
        totalPrice: Joi.number().required(),
    }),
};
