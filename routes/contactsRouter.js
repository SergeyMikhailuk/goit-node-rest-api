import express from "express";

import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
} from "../controllers/contactsControllers.js";
import { contactSchema, contactUpdateSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", validateBody(contactSchema), createContact);
contactsRouter.put("/:id", validateBody(contactUpdateSchema), updateContact);

export default contactsRouter;