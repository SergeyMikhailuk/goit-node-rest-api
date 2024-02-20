import dotenv from "dotenv";
import path from "path";

dotenv.config({
	path: path.resolve(process.cwd(), 'envs', `${process.env.NODE_ENV ?? 'development'}.env`)
})

const serverConfig = {
	mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017',
	port: process.env.PORT ?? 4000,
	environment: process.env.NODE_ENV ?? 'development',
	jwtSecret: process.env.JWT_SECRET ?? 'super_secret',
	jwtExpiresIn: process.env.JWT_EXPIRES ?? '1h',
}

export { serverConfig };