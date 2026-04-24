import { Router } from "express";
import { validateResgisterUser } from "../validator/auth.validator.js";
import { register } from "../controllers/auth.controller.js";
const router = Router();

router.post("/register", validateResgisterUser, register);
export default router;