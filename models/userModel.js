import { model, Schema } from "mongoose";
import crypto from "crypto";

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
	avatarURL: String
},
{
	timestamps: true,
	versionKey: false
})

userSchema.pre("save", async function () {
	if (this.isNew) {
		const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

		this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=wavatar`;
	}
});

const User = model('user', userSchema);

export { User };