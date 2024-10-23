import Joi from "joi"

import { regexp } from "../configs"

const devicesSearchFormValidator = Joi.object({
  category: Joi.any(),
  name: Joi.string().regex(regexp.SEARCH).required().messages({
    "string.pattern.base": "Invalid characters or less than one letter entered",
  }),
})

export { devicesSearchFormValidator }
