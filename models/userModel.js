import { model, Schema } from "mongoose";

const userSchema = new Schema({
	password: {
		type: String,
		required: [true, 'Set password for user'],
		select: false
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	subscription: {
		type: String,
		enum: ["starter", "pro", "business"],
		default: "starter"
	},
	token: String,
	hidden: {
		type: Boolean,
		default: false
	},
},
{
	timestamps: true,
	versionKey: false
})

const User = model('user', userSchema);

export { User };