import bcrypt from "bcrypt";
import { duplicatedEmailError, notFoundError } from "../errors/index.js";
import { userRepositories } from "../repositories/user-repositories.js";

async function registerUser({ email, password }) {
    const emailExists = await userRepositories.findUserByEmail(email);
    if (emailExists) throw duplicatedEmailError();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userRepositories.registerUser({
        email,
        hashedPassword,
    });
    return newUser;
}

async function getUsers() {
    const users = await userRepositories.findUsers();
    if (users.length === 0) throw notFoundError();
    return users;
}

export const userServices = {
    registerUser,
    getUsers
}