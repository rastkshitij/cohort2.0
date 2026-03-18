import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import {register} from "../controller/auth.controller.js";

const authRouter = Router();

// Placeholder for auth routes (e.g., login, register, logout)
authRouter.post("/register", registerValidator , register);


export default authRouter;