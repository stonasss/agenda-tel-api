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

async function findUsers() {
    const users = await db
        .collection('users')
        .find()
        .toArray();
    return users;
}

export const userRepositories = {
    findUserByEmail,
    registerUser,
    findUsers
}