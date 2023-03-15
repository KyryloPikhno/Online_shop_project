import Joi from "joi";
import {regexp} from "../configs";

const devicesSearchFormValidator = Joi.object({
    category: Joi.any(),
    name: Joi.string().regex(regexp.SEARCH).required().messages({
        'name.pattern.base': 'Name is required'
    }),
});

export {devicesSearchFormValidator};