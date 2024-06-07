import { Router } from "express";
import { getContacts } from "../controllers/contact-controllers.js"

const contactRouter = Router();

contactRouter.get("/contatos", getContacts);

export default contactRouter;