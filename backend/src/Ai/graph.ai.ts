import { Graph, StateGraph,StateSchema,type GraphNode } from "@langchain/langgraph";
import z from "zod"
import { mistralModel, cohereModel } from "./model.ai.js";

//  state Schema is used to define format of data so thaat between node we can communicate iin proper do format 

// state is use to define data jo flow hoga and bueprint schema define karat hai 


    const state = new StateSchema({
        problem: z.string().default(""),
        solution_1: z.string().default(""),
        solution_2: z.string().default(""),
        judge: z.object({
            solution_Score1 :z.number().default(0),
            solution_Score2 :z.number().default(0),
            ssolution_1_reasoning : z.string().default(""),
            solution_1_reasoning: z.string().default("")

        })
    }) 

    const solutionNode: GraphNode<typeof state>=async (state)=>{
        const [ mistalResponse , CohereResponse ] = await Promise.all(
            [
                mistralModel.invoke(state.problem),
                cohereModel.invoke(state.problem)
            ]
        )

        return {
            solution_1 : mistalResponse.text,
            solution_2 : CohereResponse.text
        }
    }
    

    const jud