import db from "../config/database.js"

async function findContacts() {
    const contacts = await db
        .collection('contacts')
        .find()
        .toArray();
    return contacts;
}

export const contactRepositories = {
    findContacts,
}