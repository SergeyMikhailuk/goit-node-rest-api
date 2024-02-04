import HttpError from "./HttpError.js";

const validateBody = (schema) => {
	const func = (req, _, next) => {
	console.log('req.body: ', req)
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};

	return func;
};

export default validateBody;