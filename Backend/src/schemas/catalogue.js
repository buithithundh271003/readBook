import Joi from "joi";
export const CatalogueSchema= Joi.object({
    _id: Joi.string(),

    name:Joi.string().required(),
    productId: Joi.string(),



})

