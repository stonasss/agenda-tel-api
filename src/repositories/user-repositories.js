import db from "../config/database.js";

async function findUserByEmail(email) {
    const userEmail = await db
        .collection('users')
        .findOne({ email: email })
    return userEmail;
}

async function registerUser({email, password}) {
    const newUser = { email, password } ;
    await db
        .collection('users')
        .insertOne(newUser);
    return newUser;
}

export const userRepositories = {
    findUserByEmail,
    registerUser,
}