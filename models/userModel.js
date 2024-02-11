import { model, Schema } from "mongoose";
import { userRoles } from "../constants/index.js";

const userSchema = new Schema({
	// name: String,
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	year: Number,
	role: {
		type: String,
		enum: Object.values(userRoles),
		default: userRoles.USER
	},
	hidden: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true,
	versionKey: false
})

const User = model('user', userSchema);

export { User };