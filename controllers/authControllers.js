import { changeAvatar, signupService, loginService, resendVerify, verification } from "../services/usersServices.js";
import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";

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

export const updateAvatar = async (req, res, next) => {
	const { _id } = req.user;

	try {
		if (!req.file) {
			res.status(400).json({ message: "Avatar is required..." });
			return;
		}
		const { path: tmpUpload, originalname } = req.file;

		const avatarURL = await changeAvatar(originalname, tmpUpload, _id);

		res.json({ avatarURL });
	} catch (error) {
		next(error);
	}
};

export const verifyEmail = async (req, res, next) => {
	const { verificationToken } = req.params;
	try {
		await verification(verificationToken);

		res.json({
			message: "Verification successful",
		});
	} catch (err) {
		if (err.status === 404) {
			return res.status(409).json({
				message: err.message,
			});
		} else {
			next(HttpError(err.status));
		}
	}
};

export const resendVerifyEmail = async (req, res, next) => {
	const { email } = req.body;
	try {
		await resendVerify(email);

		res.json({
			message: "Verification email sent",
		});
	} catch (err) {
		if (err.status === 404 || err.status === 400) {
			return res.status(err.status).json({
				message: err.message,
			});
		} else {
			next(HttpError(err.status));
		}
	}
};