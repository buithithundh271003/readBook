import Joi from "joi";

export const productSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.string(),
    images: Joi.array().required(),
})