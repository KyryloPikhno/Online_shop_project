import Joi from "joi"

import { regexp } from "../configs"

const passwordForgotValidator = Joi.object({
  name: Joi.string().regex(regexp.NAME).required().messages({
    "string.pattern.base": "Invalid characters or less than one letter entered",
  }),
  email: Joi.string().regex(regexp.EMAIL).required().messages({
    "string.pattern.base": "Invalid email",
  }),
})

export { passwordForgotValidator }
