import Joi from "joi";

const categoryValidator = Joi.object({
    category: Joi.string().regex(/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1,20}$/).messages({
        'category.pattern.base': 'Category is required'
    })
});

export {categoryValidator}