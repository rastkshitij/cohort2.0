import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.gemini_api_key,
});
export async function testAI(){
    model.invoke("What is the capital of India?").then((response) => {
        console.log(response.text);
      })
}