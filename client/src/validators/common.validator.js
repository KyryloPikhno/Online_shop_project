import Joi from "joi";

const commonValidator = Joi.object({
    category: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).messages({
        'category.pattern.base': 'Category is required'
    }),
    brand: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).messages({
        'brand.pattern.base': 'Brand is required'
    }),
    color: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).messages({
        'color.pattern.base': 'Color is required'
    })
});

export {commonValidator}