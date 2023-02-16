import Joi from "joi";

import {regexp} from "../configs";


const loginValidator = Joi.object({
    email: Joi.string().regex(regexp.EMAIL).required(),
    password: Joi.string().regex(regexp.PASSWORD).required(),
});

export {loginValidator}