import Joi from "joi";

import {regexp} from "../configs";


const categoryValidator = Joi.object({
    category: Joi.string().regex(regexp.NAME).messages({
        'string.pattern.base': 'Category is required'
    })
});

export {categoryValidator};