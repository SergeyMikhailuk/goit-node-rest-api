import { Contact } from "../models/contactModel.js";

export function listContacts(owner) {
	return Contact.find({ owner });
}

export function getContactById(contactId, owner) {
	return Contact.findById(contactId).where("owner").equals(owner) || null;
}

export function removeContact(contactId, owner) {
	return Contact.findByIdAndDelete(contactId).where("owner").equals(owner) || null
}

export function addContact(contact) {
	return Contact.create(contact)
}

export async function updateContact(contactId, { name, email, phone }, owner) {
	const contact = await Contact.findById(contactId);

	if (!contact) return null;

	if (name) contact.name = name;
	if (email) contact.email = email;
	if (phone) contact.phone = phone;

	await contact.save().where("owner").equals(owner);

	return contact;
}

export async function changeStatusContact(contactId, favorite, owner) {
	if (typeof favorite !== 'boolean') return null;

	const contact = await Contact.findById(contactId);

	contact.favorite = favorite;

	await contact.save().where("owner").equals(owner);

	return contact;
}

