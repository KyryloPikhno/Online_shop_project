import Joi from "joi"

import { regexp } from "../configs"

const paymentValidator = Joi.object({
  country: Joi.string().regex(regexp.COUNTRY).required().messages({
    "string.pattern.base": "Number of letters minimum 1 character maximum 20 characters",
  }),
  card: Joi.number().required(),
  city: Joi.string().regex(regexp.CITY).required().messages({
    "string.pattern.base": "Number of letters minimum 1 character maximum 20 characters",
  }),
  address: Joi.string().required(),
  month: Joi.number().min(1).max(12).required(),
  year: Joi.number().min(new Date().getFullYear()).max(2037).required(),
  phone: Joi.string().required(),
  zip: Joi.number().max(99999).required(),
})

export { paymentValidator }
