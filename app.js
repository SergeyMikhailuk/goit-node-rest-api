import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

import { serverConfig } from "./configs/serverConfig.js";

const app = express();

mongoose.connect(serverConfig.mongoUrl).then(()=> {
	console.log('MongoDB connected...')
}).catch((error)=> {
	console.log(error);
	process.exit(1)
});

if (process.env.NODE_ENV === 'development') app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = serverConfig.port;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
