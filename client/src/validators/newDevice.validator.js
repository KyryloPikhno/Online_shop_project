import Joi from "joi";

const newDeviceValidator = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).required().messages({
        'name.pattern.base': 'Only letters. Min 1, max 20'
    }),
    price: Joi.number().min(50).max(10000).required(),
    countInStock: Joi.number().min(1).max(1000).required(),
    category: Joi.string().required().messages({
        'category.pattern.base': 'Category _id required'
    }),
    brand: Joi.string().required().messages({
        'brand.pattern.base': 'Brand _id required'
    }),
    color: Joi.string().required().messages({
        'color.pattern.base': 'Color _id required'
    }),
    description: Joi.string().required().messages({
        'description.pattern.base' :'Description required'
    }),
});

export {newDeviceValidator}