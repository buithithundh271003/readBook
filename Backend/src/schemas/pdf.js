import Joi from "joi";

export const pdfSchema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required(),
    fileName: Joi.string(),
 
})