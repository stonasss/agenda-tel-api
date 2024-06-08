import { Router } from "express";
import { getContacts, newContact } from "../controllers/contact-controllers.js"
import { authValidation, validateSchema } from "../middlewares/auth-validation-middleware.js";
import { contactSchema } from "../models/contact-schema.js";

const contactRouter = Router();

contactRouter.get("/contacts", getContacts);
contactRouter.post("/contacts", authValidation, validateSchema(contactSchema), newContact);

export default contactRouter;