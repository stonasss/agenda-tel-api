import httpStatus from "http-status";
import { errorHandler } from "./error-handler-middleware.js";
import { userRepositories } from "../repositories/user-repositories.js";

export function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ errors: errorMessages });
        }
        next();
    };
}

export async function authValidation(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(httpStatus.UNAUTHORIZED).send("incorrect token")
    
    try {
        const userAccess = await userRepositories.findSession(token);
        if (!userAccess) return res.status(httpStatus.UNAUTHORIZED).send("access denied")
        res.locals.session = userAccess.user_id

        next()
    } catch (err) {
        const error = err
        errorHandler(error, req, res);
    }
}