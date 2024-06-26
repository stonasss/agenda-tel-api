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

export async function getContactsById(req, res) {
    const userId = res.locals.session

    try {
        const contacts = await contactServices.getContactsById(userId)
        res.status(httpStatus.OK).send({ contacts })
    } catch (err) {
        const error = err;
        errorHandler(error, req, res)
    }
}

export async function newContact(req, res) {
    const { phone, name, email, image } = req.body;
    const userId = res.locals.session

    try {
        await contactServices.newContact({ phone, name, email, image, userId })
        res.status(httpStatus.CREATED).send({ })
    } catch (err) {
        const error = err;
        errorHandler(error, req, res)
    }
}

export async function updateContact(req, res) {
    const { phone, name, email, image } = req.body;
    const userId = res.locals.session

    try {
        await contactServices.updateContact({ phone, name, email, image, userId })
        res.status(httpStatus.OK).send({ })
    } catch (err) {
        const error = err;
        errorHandler(error, req, res)
    }
}

export async function deleteContact(req, res) {
    const { phone } = req.body;
    const userId = res.locals.session

    try {
        await contactServices.deleteContact({ phone, userId })
        res.status(httpStatus.OK).send({ })
    } catch (err) {
        const error = err;
        errorHandler(error, req, res)
    }
}