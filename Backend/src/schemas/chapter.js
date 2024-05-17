import Joi from "joi";

export const chapterSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    title: Joi.string(),
    content: Joi.object(),
    productId: Joi.string(),
})