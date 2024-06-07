import { notFoundError } from "../errors/index.js"
import { contactRepositories } from "../repositories/contact-repositories.js"

async function getContacts() {
    const contacts = await contactRepositories.findContacts();
    if (contacts.length === 0) throw notFoundError();
    return contacts;
}

export const contactServices = {
    getContacts,
}