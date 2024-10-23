import Joi from "joi"

import { regexp } from "../configs"

const colorValidator = Joi.object({
  color: Joi.string().regex(regexp.NAME).messages({
    "string.pattern.base": "Color is required",
  }),
})

export { colorValidator }
