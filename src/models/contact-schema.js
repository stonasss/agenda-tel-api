import joi from "joi";

export const contactSchema = joi.object({
    phone: joi.number().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    image: joi.string().uri()
})