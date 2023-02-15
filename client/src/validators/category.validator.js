import Joi from "joi";

const categoryValidator = Joi.object({
    category: Joi.string().regex(/^[a-z A-Zа-яёЁіІЇї]{1,20}$/).messages({
        'category.pattern.base': 'Category is required'
    })
});

export {categoryValidator}