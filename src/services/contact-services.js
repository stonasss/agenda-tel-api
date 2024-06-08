import { notFoundError } from "../errors/index.js"
import { contactRepositories } from "../repositories/contact-repositories.js"

async function getContacts() {
    const contacts = await contactRepositories.findContacts();
    if (contacts.length === 0) throw notFoundError();
    return contacts;
}

async function newContact({ phone, name, email, image, userId }) {
    const contact = await contactRepositories.newContact(phone, name, email, image, userId)
    return contact;
}

export const contactServices = {
    getContacts,
    newContact
}