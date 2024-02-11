import Joi from "joi";

export const contactSchema = Joi.object({
	name: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email().min(4).max(20).required(),
	phone: Joi.string().min(5).max(20).required(),
	favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
	name: Joi.string().min(1).max(20),
	email: Joi.string().email().min(1).max(20),
	phone: Joi.string().min(1).max(20),
}).min(1);

export const contactUpdateStatusSchema = Joi.object({
	favorite: Joi.boolean().required(),
})
