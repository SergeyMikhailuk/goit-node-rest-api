import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact as updateContactService,
	changeStatusContact
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (_, res, next) => {
	try {
		const contacts = await listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		next(error)
	}
};

export const getOneContact = async ({ params }, res, next) => {
	try {
		const contact = await getContactById(params.id);

		if (!contact) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(contact);

	} catch (error) {
		next(error)
	}

};

export const deleteContact = async ({ params }, res, next) => {
	try {
		const removedContact = await removeContact(params.id);

		if (!removedContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(200).json(removedContact)
	} catch (error) {
		next(error)
	}
};

export const createContact = async ({body}, res, next) => {
	try {
		const newContact = await addContact(body.name, body.email, body.phone);

		if (!newContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
};

export const updateContact = async ({ body, params }, res, next) => {
	try {
		if (!Object.keys(body).length) {
			throw HttpError(400, "Body must have at least one field");
		}

		const updatedContact = await updateContactService(params.id, body);

		if (!updatedContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
};

export const updateStatusContact = async ({ body, params }, res, next) => {
	try {
		const updatedContact = await changeStatusContact(params.id, body.favorite);

		if (!updatedContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
}