import express from "express";
import { getCurrent, login, logout, signup } from "../controllers/authControllers.js";
import { checkLoginData, checkSignupData, protect } from "../helpers/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/register', checkSignupData, signup);
authRouter.post('/login', checkLoginData, login);

authRouter.use(protect);
authRouter.get("/current", getCurrent);
authRouter.post("/logout", logout);

export default authRouter;
