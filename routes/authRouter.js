import express from "express";
import { getCurrent, login, logout, signup, updateAvatar } from "../controllers/authControllers.js";
import { checkLoginData, checkSignupData, protect } from "../helpers/authMiddleware.js";
import { upload } from "../helpers/upload.js";

const authRouter = express.Router();

authRouter.post('/register', checkSignupData, signup);
authRouter.post('/login', checkLoginData, login);

authRouter.use(protect);
authRouter.get("/current", getCurrent);
authRouter.post("/logout", logout);
authRouter.patch("/avatars", upload.single("avatar"), updateAvatar);

export default authRouter;
