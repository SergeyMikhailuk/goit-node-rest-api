import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

dotenv.config({
	path: process.env.NODE_ENV === 'production' ? './envs/production.env' : './envs/development.env'
})

if (process.env.NODE_ENV === 'development') app.use(morgan("dev"));

mongoose.connect(process.env["MONGO_URL"]).then(()=> {
	console.log('MongoDB connected...')
}).catch((error)=> {
	console.log(error);
	process.exit(1)
});

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
