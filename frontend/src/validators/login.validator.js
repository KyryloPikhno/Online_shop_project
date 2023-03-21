import Joi from "joi";

import {regexp} from "../configs";


const loginValidator = Joi.object({
    email: Joi.string().regex(regexp.EMAIL).required().messages({
        'string.pattern.base': 'Only english letters. Min 1, max 20'
    }),
    password: Joi.string().regex(regexp.PASSWORD).required().messages({
        'string.pattern.base': 'Only english letters. Min 1, max 20'
    }),
});

export {loginValidator};