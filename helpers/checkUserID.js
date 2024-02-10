import { Types } from "mongoose";
import HttpError from "./HttpError.js";

const checkUserID = (req, res, next) => {
	const { id } = req.params;
	const isValidID = Types.ObjectId.isValid(id);

	if (!isValidID) next(HttpError(404, 'ID is no valid'));

	next()
}

export default checkUserID;