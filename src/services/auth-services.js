import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../errors/index.js";
import { authRepositories } from "../repositories/auth-repositories.js";

async function registerUser({ email, password }) {
    const emailExists = await authRepositories.findUserByEmail(email);
    if (emailExists) throw duplicatedEmailError();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await authRepositories.registerUser({
        email,
        hashedPassword,
    });
    return newUser;
}

export const authServices = {
    registerUser,
}