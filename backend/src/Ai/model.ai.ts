import { ChatCohere } from "@langchain/cohere";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js"


export const geminiModel =  new ChatGoogleGenerativeAI({
    model:"gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY
})
export const mistralModel =  new ChatGoogleGenerativeAI({
    model:"mistral-medium-latest",
    apiKey:config.MISTRAL_API_KEY
})
export const cohereModel =  new ChatGoogleGenerativeAI({
    model:"cohere-command-a-03-2025",
    apiKey:config.COHERE_API_KEY
})