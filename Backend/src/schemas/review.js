import Joi from "joi";

export const reviewSchema = Joi.object({
    _id: Joi.string(),
    userId: Joi.string(),
    title: Joi.string().required(),
    productId: Joi.string(),
})