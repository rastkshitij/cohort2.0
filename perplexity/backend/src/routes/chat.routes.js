import { Router }  from "express"
import { sendMessage , getChats , getMessages , deletechats } from "../controller/chat.controller.js";
import { authuser } from "../middleware/auth.middleware.js";
const chatRouter =  Router();

chatRouter.post("/message" ,authuser , sendMessage)
chatRouter.get("/" , authuser ,  getChats)
chatRouter.get("/:chatId/messages" , authuser , getMessages)
chatRouter.delete("/delete/:chatId" , authuser , deletechats)

export default chatRouter