import Joi from "joi";

const colorValidator = Joi.object({
    color: Joi.string().regex(/^[a-z A-Zа-яёЁіІЇї]{1,20}$/).messages({
        'color.pattern.base': 'Color is required'
    })
});

export {colorValidator}