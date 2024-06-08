import db from "../config/database.js"
import { ObjectId } from "mongodb";

async function findContacts() {
    const contacts = await db
        .collection('contacts')
        .find()
        .toArray();
    return contacts;
}

async function findContactListById(id) {
    const contactList = await db
        .collection('contacts')
        .findOne({ _id: id });
    return contactList;
}

async function createContactList(id, email) {
    const newContactList = await db
        .collection('contacts')
        .insertOne({
            _id: id,
            email: email,
            contacts: [],
        });
    return newContactList;
}

async function newContact(phone, name, email, image, userId) {
    const contactInfo = {
        phone,
        name,
        email,
        image
    };
    const newContact = await db
        .collection('contacts')
        .updateOne(
            { _id: new ObjectId(userId) },
            { $push: { contacts: { ...contactInfo } } }
        );
    return newContact;
}

export const contactRepositories = {
    findContacts,
    findContactListById,
    createContactList,
    newContact
}