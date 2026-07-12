import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv"

dotenv.config()

export const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY!,
  model: "openai/gpt-oss-120b",
  temperature: 0,
});

// const response = await llm.invoke("Hi");
// console.log(response.content)