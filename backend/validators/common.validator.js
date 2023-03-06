const Joi = require('joi');


module.exports = {
    commonValidator: Joi.object({
        name: Joi.string().required().min(2).max(12)
    }),
};