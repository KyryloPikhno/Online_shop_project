import Joi from "joi";

const brandValidator = Joi.object({
    brand: Joi.string().regex(/^[a-z A-Zа-яёЁіІЇї]{1,20}$/).messages({
        'brand.pattern.base': 'Brand is required'
    })
});

export {brandValidator}