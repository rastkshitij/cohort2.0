import { Router } from "express";
import { registerValidator , loginValidator } from "../validators/auth.validator.js";
import {register , verifyEmail , login , getMe} from "../controller/auth.controller.js";
import { authuser } from "../middleware/auth.middleware.js";
const authRouter = Router();

// Placeholder for auth routes (e.g., login, register, logout)
authRouter.post("/register", registerValidator , register);
authRouter.get("/verify-email",verifyEmail)
authRouter.post("/login" , loginValidator , login)
authRouter.get("/get-me" ,authuser, getMe)
export default authRouter;