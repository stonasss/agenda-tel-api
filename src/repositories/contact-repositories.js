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

async function findContactByPhone(phone, userId) {
    const contact = await db
        .collection('contacts')
        .findOne(
            { _id: new ObjectId(userId), "contacts.phone": phone }
        );
    return contact;
}

async function updateContact(phone, name, email, image, userId) {
    const updatedContact = await db
        .collection('contacts')
        .updateOne(
            { _id: new ObjectId(userId), "contacts.phone": phone },
            {
                $set: {
                    "contacts.$.phone": phone,
                    "contacts.$.name": name,
                    "contacts.$.email": email,
                    "contacts.$.image": image
                }
            }
        )
    return updatedContact
}

async function deleteContact(phone, userId) {
    const deleteContact = await db
        .collection('contacts')
        .updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { contacts: { phone: phone } } }
        )
    return deleteContact;
}

export const contactRepositories = {
    findContacts,
    findContactListById,
    findContactByPhone,
    createContactList,
    newContact,
    updateContact,
    deleteContact
}