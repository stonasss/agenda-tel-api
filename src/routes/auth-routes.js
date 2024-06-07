import { Router } from "express";
import { register } from "../controllers/auth-controllers.js";
import { validateSchema } from "../middlewares/auth-validation-middleware.js";
import { userSchema } from "../models/auth-schema.js";

const authRouter = Router();

authRouter.post("/register", validateSchema(userSchema), register);

export default authRouter;