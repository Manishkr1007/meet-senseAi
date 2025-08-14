import {cache} from "react";
import { initTRPC } from '@trpc/server'; // Add this import

export const createTRPCContext = cache(async() => {
return {userId:"user_123"};
});

const t = initTRPC.create({

});
export const createTRPCRouter =t.router;
export const createCallFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;