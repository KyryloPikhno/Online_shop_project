import Joi from "joi";

import {regexp} from "../configs";


const registerValidator = Joi.object({
    name :Joi.string().regex(regexp.NAME).required(),
    email: Joi.string().regex(regexp.EMAIL).required(),
    password: Joi.string().regex(regexp.PASSWORD).required(),
});

export {registerValidator};