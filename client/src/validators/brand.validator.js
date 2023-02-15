import Joi from "joi";

const brandValidator = Joi.object({
    brand: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).messages({
        'brand.pattern.base': 'Brand is required'
    })
});

export {brandValidator}