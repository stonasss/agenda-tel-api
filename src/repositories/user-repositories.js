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

async function authenticate(id, token, expiration) {
    const session = await db
        .collection('sessions')
        .updateOne(
            { 
                user_id: id 
            },
            {
                $set: {
                    user_id: id,
                    token: token,
                    expire_at: expiration,
                },
            },
            {
                upsert: true
            }
        );
    return session;
}

export const userRepositories = {
    findUserByEmail,
    registerUser,
    findUsers,
    authenticate
}