import Joi from "joi";

export const signupUserSchema = (data) =>
	Joi.object()
		.keys({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		})
		.validate(data);