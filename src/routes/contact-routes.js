import { Router } from "express";
import { getContacts } from "../controllers/contact-controllers.js"

const contactRouter = Router();

contactRouter.get("/contacts", getContacts);

export default contactRouter;