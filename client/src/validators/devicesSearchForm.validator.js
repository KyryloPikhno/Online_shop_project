import Joi from "joi";

const devicesSearchFormValidator = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).messages({
        'name.pattern.base': 'Name is required'
    })
});

export {devicesSearchFormValidator}