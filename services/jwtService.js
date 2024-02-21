import jwt from 'jsonwebtoken';
import { serverConfig } from "../configs/serverConfig.js";
import httpError from "../helpers/HttpError.js";

export const signToken = (id) => jwt.sign({id}, serverConfig.jwtSecret, {
	expiresIn: serverConfig.jwtExpiresIn
})

export const checkToken = (token) => {

	if (!token) throw httpError(401, 'Not logged in...');

	try {
		const { id } = jwt.verify(token, serverConfig.jwtSecret);
		return id;
	} catch (e) {
		throw httpError(401, 'Not logged in...')
	}
}