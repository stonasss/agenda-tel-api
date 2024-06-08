import { Router } from "express";
import { getContacts, getContactsById, newContact, updateContact, deleteContact } from "../controllers/contact-controllers.js"
import { authValidation, validateSchema } from "../middlewares/auth-validation-middleware.js";
import { contactSchema, nameSchema } from "../models/contact-schema.js";

const contactRouter = Router();

contactRouter.get("/contacts", getContacts);
contactRouter.get("/user-contacts/", authValidation, getContactsById)
contactRouter.post("/contacts", authValidation, validateSchema(contactSchema), newContact);
contactRouter.put("/contacts", authValidation, validateSchema(contactSchema), updateContact);
contactRouter.delete("/contacts", authValidation, validateSchema (nameSchema), deleteContact);

export default contactRouter;