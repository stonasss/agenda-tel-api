import joi from "joi";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

export const authenticateSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export class AuthToken {
    constructor() {
        this.uuid = uuidv4();
        this.expire_at = dayjs().add(1, "hour").format();
    }
}