import { Contact } from "../models/contactModel.js";

export function listContacts() {
	// Contact.find().select('+email');
	// Contact.find().select('-name');
	// Contact.find().select('name phone');
	return Contact.find();
}

export function getContactById(contactId) {
	return Contact.findById(contactId) || null;
}

export function removeContact(contactId) {
	return Contact.findByIdAndDelete(contactId) || null
}

export function addContact(name, email, phone) {
	return Contact.create({ name, email, phone })
}

export async function updateContact(contactId, { name, email, phone }) {
	const contact = await Contact.findById(contactId);

	if (!contact) return null;

	if (name) contact.name = name;
	if (email) contact.email = email;
	if (phone) contact.phone = phone;

	await contact.save();

	return contact;
}

export async function changeStatusContact(contactId, favorite) {
	if (typeof favorite !== 'boolean') return null;

	const contact = await Contact.findById(contactId);

	contact.favorite = favorite;

	await contact.save();

	return contact;
}

