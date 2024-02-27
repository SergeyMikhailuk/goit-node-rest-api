import { User } from "../models/userModel.js"
import { signToken } from "./jwtService.js";
import HttpError from "../helpers/HttpError.js";
import bcryptjs from "bcryptjs";
import path from "path";
import { v4 } from "uuid";
import Jimp from "jimp";
import fse from 'fs-extra';
import sendEmail from "../helpers/sendEmail.js";

const { BASE_URL } = process.env;

export const signupService = async ({ email, password }) => {
	const hashPassword = await bcryptjs.hash(password, 10);
	const verificationToken = v4();

	const newUser = await User.create({
		email,
		password: hashPassword,
		subscription: "starter",
		verificationToken
	});

	newUser.password = undefined;
	const token = signToken(newUser.id);

	const verifyEmail = {
		to: email,
		subject: "Verify your email",
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify email</a>`,
		text: `href="${BASE_URL}/api/users/verify/${verificationToken} Click here to verify email`,
	};

	await sendEmail(verifyEmail);

	return { user: newUser, token };
}

export const checkUserExists = async ({ email }) => {
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}
};

export const loginService = async ({ email, password }) => {
	const user = await User.findOne({ email }).select('+password');

	if (!user) throw HttpError(401, "Not authorized...");

	const isPasswordValid = await bcryptjs.compare(password, user.password);

	if (!isPasswordValid) throw HttpError(401, "Not authorized...");

	user.password = undefined;
	const token = signToken(user.id);
	const updatedUser = await User.findByIdAndUpdate(user.id, { token }, { new: true });

	return { user: updatedUser, token };
}

export const changeAvatar = async (originalname, tmpUpload, _id) => {
	const avatarsDir = path.resolve("public", "avatars");
	const fileName = `${_id}-${v4()}${originalname}`;
	const resolvedPath = path.resolve(avatarsDir, fileName);

	const image = await Jimp.read(tmpUpload);
	image.resize(250, 250).write(resolvedPath);
	await fse.unlink(tmpUpload);

	const avatarURL = path.join("avatars", fileName);

	await User.findByIdAndUpdate(_id, { avatarURL });

	return avatarURL;
};

export const resendVerify = async (email) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(404, "User not found");
	}

	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

	const verifyEmail = {
		to: email,
		subject: "Verify your email",
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify email</a>`,
		text: `href="${BASE_URL}/api/users/verify/${user.verificationToken} Click here to verify email`,
	};

	await sendEmail(verifyEmail);
};

export const verification = async (verificationToken) => {
	const user = await User.findOne({ verificationToken });

	if (!user) {
		throw HttpError(404, "User not found");
	}

	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: null,
	});
};