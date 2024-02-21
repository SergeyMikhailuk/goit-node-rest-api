import { signupService, loginService } from "../services/usersServices.js";
import {User} from "../models/userModel.js";

export const signup = async (req, res, next) => {
	try {
		const { user, token } = await signupService(req.body);

		res.status(201).json({
			msg: "Success",
			user,
			token
		})
	} catch (error) {
		next(error);
	}
}

export const login = async  (req, res, next) => {
	try {
		const { user, token } = await loginService(req.body);

		res.status(200).json({
			msg: "Success",
			user,
			token
		})
	} catch (error) {
		next(error);
	}
}

export const getCurrent = async (req, res, next) => {
	const { email, subscription } = req.user;
	try {
		res.json({ email, subscription });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	const { _id } = req.user;

	try {
		await User.findByIdAndUpdate(_id, { token: "" });

		res.status(204).json();
	} catch (error) {
		next(error);
	}
};