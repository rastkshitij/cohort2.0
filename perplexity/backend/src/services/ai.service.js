import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {AIMessage, HumanMessage , SystemMessage} from "langchain"
import { ChatMistralAI } from "@langchain/mistralai"
const Geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.gemini_api_key,
});

const mistralModel = new ChatMistralAI({
  model :  "mistral-small-latest" 
  ,apiKey : process.env.MISTRAL_API_KEY
})

export async function generateResponse(messages) {
  const formattedMessages = messages
    .map(msg => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } 
      else if (msg.role === "ai") {
        return new AIMessage(msg.content);
      }
      return null; // fallback
    })
    .filter(Boolean); // removes null/undefined

  const response = await Geminimodel.invoke(formattedMessages);

  return response.text;
}

export async function genrateTitle(message) {
  const response = await mistralModel.invoke([
new SystemMessage(`You are a helpful assistant that genrates consise and descriptive titles for the chat converstion
  
User will provide you with the first message of chat converstaion , and you will generate a title , that capture the essence of the converstion  in 2-5 words . the title should be clear , relevant , and engaging , give users a quick understanding of chat's topic

  `) ,
  new HumanMessage (`
    Genrate a title for a chat converstaion based on the following first message :
    "${message}"
    `)
  ])
  return response.text
}