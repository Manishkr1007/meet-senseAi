import { createTRPCRouter, ProctectedProcedure } from "@/trpc/init";
import { z } from "zod";
import {db} from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { eq } from "drizzle-orm";


export const agentsRouter = createTRPCRouter({
    getOne: ProctectedProcedure.input(z.object({id:z.string()})).query(async({input})=>{
        const [existingAgent] =await db.select().from(agents).where(eq(agents.id,input.id));
        // Simulate a delay
        return existingAgent;
    }),
    getMany: ProctectedProcedure.query(async()=>{
        const data =await db.select().from(agents);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
        return data;
    }),
    create:ProctectedProcedure.input(agentsInsertSchema).mutation(async({input,ctx})=>{
       const [createdAgent] = await db
       .insert(agents)
       .values({
        ...input,
        userId: ctx.auth.user.id,
        instructions: input.instructions, 
       })
       .returning(); 
         return createdAgent; 
    })

    ,});