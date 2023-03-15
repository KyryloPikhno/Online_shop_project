import Joi from "joi";

import {regexp} from "../configs";


const newPasswordValidator = Joi.object({
    password: Joi.string().regex(regexp.PASSWORD).required(),
    password_confirmation: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })});

export {newPasswordValidator};