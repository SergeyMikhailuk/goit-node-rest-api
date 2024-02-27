import dotenv from "dotenv";
dotenv.config();
import sendgrid from "@sendgrid/mail";

console.log(process.env)
const { SENDGRID_API_KEY } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
	const email = { ...data, from: "s.mikhaylyuk@hacken.io" };
	await sendgrid.send(email);
	return true;
};

export default sendEmail;