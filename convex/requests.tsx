
import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
    args:{},
    handler: async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new ConvexError("Unauthorized!")
        }

        const currUser = await getUserByClerkId({
            ctx,clerkId:identity.subject
        })

        if(!currUser){
            throw new ConvexError("User not found!")
        }

        const requests = await ctx.db.query('requests').withIndex('by_receiver', (q) => q.eq('receiver',currUser._id)).collect();

        const requestWithSenders = await Promise.all(requests.map( async (request)=>{
            const sender = await ctx.db.get(request.sender)
            if(!sender){
                throw new ConvexError('Sender not found')
            }

            return {sender,request}
        }))
        return requestWithSenders;
    }
})

export const count = query({
    args:{},
    handler: async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new ConvexError("Unauthorized!")
        }

        const currUser = await getUserByClerkId({
            ctx,clerkId:identity.subject
        })

        if(!currUser){
            throw new ConvexError("User not found!")
        }

        const requests = await ctx.db.query('requests').withIndex('by_receiver', (q) => q.eq('receiver',currUser._id)).collect();

        return requests.length;
    }
})