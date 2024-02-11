import express from "express";

import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	updateStatusContact,
} from "../controllers/contactsControllers.js";
import {contactSchema, contactUpdateSchema, contactUpdateStatusSchema} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import checkUserID from "../helpers/checkUserID.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", checkUserID, getOneContact);
contactsRouter.delete("/:id", checkUserID, deleteContact);
contactsRouter.post("/", validateBody(contactSchema), createContact);
contactsRouter.put("/:id", checkUserID, validateBody(contactUpdateSchema), updateContact);
contactsRouter.patch("/:id/favorite", checkUserID, validateBody(contactUpdateStatusSchema), updateStatusContact);

export default contactsRouter;