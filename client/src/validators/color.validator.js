import Joi from "joi";

const colorValidator = Joi.object({
    color: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).messages({
        'color.pattern.base': 'Color is required'
    })
});

export {colorValidator}