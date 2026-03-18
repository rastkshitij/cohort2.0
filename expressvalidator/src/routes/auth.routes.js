import { Router } from "express";
import {register} from "../controller/auth.controller.js"
import {body , validationResult    }  from "express-validator"
const authRouter =  Router()
 authRouter.post("/register"  ,register)




export default authRouter