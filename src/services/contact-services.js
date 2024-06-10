import { duplicatedPhoneError, notFoundError } from "../errors/index.js"
import { contactRepositories } from "../repositories/contact-repositories.js"

async function getContacts() {
    const contacts = await contactRepositories.findContacts();
    if (contacts.length === 0) throw notFoundError();
    return contacts;
}

async function getContactsById(userId) {
    const contacts = await contactRepositories.findContactListById(userId);
    if (contacts.length === 0) throw notFoundError();

    const userContacts = contacts.contacts.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0
    })

    return userContacts
}

async function newContact({ phone, name, email, image, userId }) {
    const contactExists = await contactRepositories.findContactByPhone(phone, userId)
    if (contactExists) throw duplicatedPhoneError();
    const contact = await contactRepositories.newContact(phone, name, email, image, userId)
    return contact;
}

async function updateContact({ phone, name, email, image, userId }) {
    const contact = await contactRepositories.updateContact(phone, name, email, image, userId)
    return contact;
}

async function deleteContact({ phone, userId }) {
    const contactExists = await contactRepositories.findContactByPhone(phone, userId)
    if (!contactExists) throw notFoundError();
    const contact = await contactRepositories.deleteContact(phone, userId);
    return contact;
}

export const contactServices = {
    getContacts,
    getContactsById,
    newContact,
    updateContact,
    deleteContact
}