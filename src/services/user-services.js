import bcrypt from "bcrypt";
import { duplicatedEmailError, invalidCredentialsError, notFoundError } from "../errors/index.js";
import { userRepositories } from "../repositories/user-repositories.js";
// import { AuthToken } from "../models/auth-schema.js";
import jwt from "jsonwebtoken";
import { contactRepositories } from "../repositories/contact-repositories.js";

async function registerUser({ email, password }) {
    const emailExists = await userRepositories.findUserByEmail(email);
    if (emailExists) throw duplicatedEmailError();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userRepositories.registerUser({
        email,
        password: hashedPassword,
    });
    return newUser;
}

async function getUsers() {
    const users = await userRepositories.findUsers();
    if (users.length === 0) throw notFoundError();
    return users;
}

async function loginUser({ email, password }) {
    const userExists = await userRepositories.findUserByEmail(email);
    if (userExists.length === 0) throw notFoundError()

    const identicalPassword = await bcrypt.compare(password, userExists.password)
    if (!identicalPassword) throw invalidCredentialsError()

    const token = jwt.sign({ id: userExists._id }, process.env.SECRET_KEY, { expiresIn: 86400 });
    await userRepositories.authenticate(userExists._id, token)

    const userContacts = await contactRepositories.findContactListById(userExists._id)
    if (!userContacts) await contactRepositories.createContactList(userExists._id, email)
    return {token, userContacts};
}

export const userServices = {
    registerUser,
    getUsers,
    loginUser
}