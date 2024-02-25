import { signupUserSchema } from "../schemas/usersSchema.js";
import { checkUserExists } from "../services/usersServices.js";
import httpError from "./HttpError.js";
import { User } from "../models/userModel.js";
import {checkToken} from "../services/jwtService.js";
import multer from "multer";
import { v4 } from "uuid";

export const checkSignupData = async (req, res, next) => {
	 try {
		 const { value, error } = signupUserSchema(req.body);

		 if (error) throw httpError(400, 'Invalid user data...');

		 await checkUserExists({ email: value.email });

		 req.body = value;
		 next()
	 } catch (error) {
		 next(error)
	 }
}

export const checkLoginData = async (req, res, next) => {
	 try {
		 const { value, error } = signupUserSchema(req.body);

		 if (error) throw httpError(400, 'Invalid user data...');

		 const { email } = value;

		 const user = await User.findOne({ email });

		 if (!user) throw httpError(401, "Not authorized...");

		 next();
	 } catch (error) {
		 next(error)
	 }
}

export const protect = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.startsWith('Bearer ')
			&& req.headers.authorization.split(" ")[1];
		console.log('req.headers.authorization: ', req.headers.authorization)
		const userId = checkToken(token);

		if (!userId) throw httpError(401, 'Not logged in...');

		const currentUser = await User.findById(userId)

		if (!currentUser) throw httpError(401, 'Not logged in...');

		if (!currentUser || !currentUser.token || currentUser.token !== token) {
			throw httpError(401, 'Not logged in...');
		}

		req.user = currentUser;

		next()
	} catch (error) {
		next(error)
	}
}

export const allowFor = (...roles) => (req, res, next) => {
	if (roles.includes(req.user.subscription)) return next();

	throw httpError(403, 'You are not allowed to perform this action');
}

const multerStorage = multer.diskStorage({
	destination: (req, file, cbk) => {
		cbk(null, "tpm");
	},
	filename: (req, file, cbk) => {
		const extension = file.mimetype.split("/")[1];

		cbk(null, `${req.user.id}-${v4()}.${extension}`);
	},
});

const multerFilter = (req, file, cbk) => {
	if (file.mimetype.startsWith("image/")) {
		cbk(null, true);
	} else {
		cbk(new httpError(400, "You can upload only img..."), false);
	}
};

export const uploadAvatar = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
}).single("avatar");