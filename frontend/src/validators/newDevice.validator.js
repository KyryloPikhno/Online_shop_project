import Joi from "joi";

import {regexp} from "../configs";


const newDeviceValidator = Joi.object({
    name: Joi.string().regex(regexp.NAME).required().messages({
        'string.pattern.base': 'Invalid characters or less than one letter entered'
    }),
    price: Joi.number().min(50).max(10000).required(),
    countInStock: Joi.number().min(1).max(1000).required(),
    category: Joi.string().required().messages({
        'string.pattern.base': 'Category _id required'
    }),
    brand: Joi.string().required().messages({
        'string.pattern.base': 'Brand _id required'
    }),
    color: Joi.string().required().messages({
        'string.pattern.base': 'Color _id required'
    }),
    description: Joi.string().required().messages({
        'string.pattern.base' :'Description required'
    }),
});

export {newDeviceValidator};