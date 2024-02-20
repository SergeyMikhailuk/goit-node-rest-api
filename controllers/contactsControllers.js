import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact as updateContactService,
	changeStatusContact
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async ({user}, res, next) => {
	const {_id: owner} = user;

	try {
		const contacts = await listContacts(owner).populate({path: 'owner', select: 'email'});
		res.status(200).json(contacts);
	} catch (error) {
		next(error)
	}
};

export const getOneContact = async ({ params, user }, res, next) => {
	const {_id: owner} = user;

	try {
		const contact = await getContactById(params.id, owner);

		if (!contact) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error)
	}

};

export const deleteContact = async ({ params, user }, res, next) => {
	const {_id: owner} = user;

	try {
		const removedContact = await removeContact(params.id, owner);

		if (!removedContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(200).json(removedContact)
	} catch (error) {
		next(error)
	}
};

export const createContact = async ({ user, body }, res, next) => {
	const {_id: owner} = user;

	try {
		const newContact = await addContact({
			name: body.name,
			email: body.email,
			phone: body.phone,
			owner
		});

		if (!newContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
};

export const updateContact = async ({ body, params, user }, res, next) => {
	const { _id: owner } = user;

	try {
		if (!Object.keys(body).length) {
			throw HttpError(400, "Body must have at least one field");
		}

		const updatedContact = await updateContactService(params.id, body, owner);

		if (!updatedContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
};

export const updateStatusContact = async ({ body, params, user }, res, next) => {
	const { _id: owner } = user;

	try {
		const updatedContact = await changeStatusContact(params.id, body.favorite, owner);

		if (!updatedContact) {
			throw HttpError(404, "Not Found");
		}

		res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
}