import httpStatus from "http-status";
import { errorHandler } from "../middlewares/error-handler-middleware.js";
import { userServices } from "../services/user-services.js";

export async function register(req, res) {
    const { email, password } = req.body

    try {
        const newUser = await userServices.registerUser({ email, password });
        res.status(httpStatus.CREATED).send({ newUser })
    } catch (err) {
        const error = err;
        errorHandler(error, req, res);
    }
}