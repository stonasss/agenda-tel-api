import httpStatus from "http-status";
import { contactServices } from "../services/contact-services.js"
import { errorHandler } from "../middlewares/error-handler-middleware.js";

export async function getContacts(req, res) {
    try {
        const contacts = await contactServices.getContacts();        
        res.status(httpStatus.OK).send({ contacts })
    } catch (err) {
        const error = err
        errorHandler(error, req, res);
    }
}