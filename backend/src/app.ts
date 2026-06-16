import express from "express"
import runGraph from "../src/Ai/graph.ai.js"

export const app= express()


app.get("/", async (req,res)=>{
    
    const result = await runGraph("What is Factorial Code")

   return  res.json(result)
})