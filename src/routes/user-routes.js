import { Router } from "express";
import { loginUser, register, getUsers } from "../controllers/user-controllers.js";
import { validateSchema } from "../middlewares/auth-validation-middleware.js";
import { authenticateSchema, userSchema } from "../models/auth-schema.js";

const userRouter = Router();

userRouter.post("/", validateSchema(authenticateSchema), loginUser)
userRouter.post("/register", validateSchema(userSchema), register);
userRouter.get("/users", getUsers);

export default userRouter;