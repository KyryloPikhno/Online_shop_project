import Joi from "joi";

const devicesSearchFormValidator = Joi.object({
    category: Joi.any(),
    name: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){0,20}$/).required().messages({
        'name.pattern.base': 'Name is required'
    }),
});

export {devicesSearchFormValidator}