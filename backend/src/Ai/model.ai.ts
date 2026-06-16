import { ChatCohere } from "@langchain/cohere";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import config from 


export const geminiModel =  new ChatGoogleGenerativeAI({
    model:"gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY
})
export const mistralModel =  new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:config.MISTRAL_API_KEY
})
export const cohereModel =  new ChatCohere({
    model:"cohere-command-a-03-2025",
    apiKey:config.COHERE_API_KEY
RE_API_KEY
RE_API_KEY
RE_API_KEY
HERE_API_KEY
})