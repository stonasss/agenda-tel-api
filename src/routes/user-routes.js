import { Router } from "express";
import { register } from "../controllers/user-controllers.js";
import { validateSchema } from "../middlewares/auth-validation-middleware.js";
import { userSchema } from "../models/auth-schema.js";

const userRouter = Router();

userRouter.post("/register", validateSchema(userSchema), register);

export default userRouter;