import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
	const contacts = await fs.readFile(contactsPath, 'utf8');
	return JSON.parse(contacts);
}

export async function getContactById(contactId) {
	const contacts = await listContacts();
	return contacts.find(contact => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === contactId);
	if (index !== -1) {
		const [removedContact] = contacts.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return removedContact;
	}
	return null;
}

export async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: uuidv4(),
		name,
		email,
		phone
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

export async function updateContact(contactId, { name, email, phone }) {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === contactId);
	if (index === -1) return null;

	if (name) contacts[index].name = name;
	if (email) contacts[index].email = email;
	if (phone) contacts[index].phone = phone;

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
}

