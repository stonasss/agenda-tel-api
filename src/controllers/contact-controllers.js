import httpStatus from "http-status";
import { contactServices } from "../services/contact-services.js"

export async function getContacts(req, res) {
    try {
        const contacts = await contactServices.getContacts();        
        res.status(httpStatus.OK).send({ contacts })
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}