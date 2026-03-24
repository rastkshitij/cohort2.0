
import { generateResponse ,genrateTitle} from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";
import { AIMessage } from "langchain";
export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let chat = null;
  let title = null;
  let finalChatId;

  // 🟢 Case 1: New Chat
  if (!chatId) {
    title = await genrateTitle(message);

    chat = await chatModel.create({
      user: req.user.id,
      title,
    });

    finalChatId = chat._id;
  } 
  // 🔵 Case 2: Existing Chat
  else {
    finalChatId = chatId;
  }

  // ✅ Save user message
  const userMessage = await messageModel.create({
    chat: finalChatId,
    content: message,
    role: "user",
  });

  // ❗ Fix: use finalChatId instead of chatId
  const messages = await messageModel.find({ chat: finalChatId });

  const result = await generateResponse(messages);

  // ✅ Save AI message
  const aiMessage = await messageModel.create({
    chat: finalChatId,
    content: result,
    role: "ai",
  });

  res.status(201).json({
    aimessage: result,
    title,
    chat,
    aiMessage,
  });
}


export async function getChats(req , res) {
  const user = req.user;
  const chats = await  chatModel.find({user :  user.id})
  res.status(203).json({
    message : "Chats feched sucessfully" , 
    chats
  })
}

export async function getMessages (req , res){
const {chatId } =  req.params ; 
const chat =  await chatModel.findOne({
 _id :  chatId , 
 user :  req.user.id
})
const messages =  await  messageModel.find({
  chat :  chatId  
})
res.status(201).json({
  message :  "Messages  reterived succesfully" ,
  messages
})
}

export  async function deletechats(req, res ){
const { chatId } = req.params 
const chat = await chatModel.findByIdAndDelete(chatId)
await  messageModel.deleteMany({
  chat : chatId
})
if(!chat){
  return res.status(404).json({
    message : "Chat not Found"
  })
}
res.status(200).json({
  message : "Chat deleted successfully"
})
}

