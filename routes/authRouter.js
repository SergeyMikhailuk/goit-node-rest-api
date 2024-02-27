import express from "express";
import { getCurrent, login, logout, signup, updateAvatar, resendVerifyEmail, verifyEmail } from "../controllers/authControllers.js";
import { checkLoginData, checkSignupData, protect, validateVerificationEmail } from "../helpers/authMiddleware.js";
import { upload } from "../helpers/upload.js";

const authRouter = express.Router();

authRouter.post('/register', checkSignupData, signup);
authRouter.post('/login', checkLoginData, login);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateVerificationEmail, resendVerifyEmail);

authRouter.use(protect);
authRouter.get("/current", getCurrent);
authRouter.post("/logout", logout);
authRouter.patch("/avatars", upload.single("avatar"), updateAvatar);

export default authRouter;
