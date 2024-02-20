import { model, Schema } from "mongoose";

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Set name for contact']
	},
	email: {
		type: String,
		unique: true
	},
	phone: {
		type: String,
	},
	favorite: {
		type: Boolean,
		default: false
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	}
}, {
	timestamps: true,
	versionKey: false
});

const Contact = model('contact', contactSchema);

export { Contact };