const Joi = require('joi');


module.exports = {
    newBrandValidator: Joi.object({
        brand: Joi.string().required().min(2).max(12)
    }),
};