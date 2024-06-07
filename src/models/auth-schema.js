import joi from "joi";
// import { v4 as uuidv4 } from "uuid";

export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

/* export const authenticateSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
}); */