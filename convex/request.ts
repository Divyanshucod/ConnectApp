import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";


export const create = mutation({
    args:{
        email:v.string()
    },
    handler:async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new ConvexError('Unauthorized')
        }
        if(args.email === identity.email){
            throw new ConvexError("can't send request to yourself")
        }

        const currUser = await getUserByClerkId({clerkId:identity.subject,ctx})
        if(!currUser){
            throw new ConvexError("User not found")
        }

        const receiver = await ctx.db.query('users').withIndex('by_email',(q) => q.eq('email',args.email)).unique()

        if(!receiver){
            throw new ConvexError("Receiver is not using communicate")
        }

        const requestAlreadySent = await ctx.db.query('requests').withIndex('by_receiver_sender', (q) => q.eq('receiver',receiver._id).eq('sender',currUser._id))

        if(requestAlreadySent){
            throw new ConvexError('request was already send!')
        }

        const requestAlreadyReceived = await ctx.db.query('requests').withIndex('by_receiver_sender', (q) => q.eq('receiver',currUser._id).eq('sender',receiver._id))

        if(requestAlreadySent){
            throw new ConvexError('this user has already sent you a request')
        }

        const request = await ctx.db.insert('requests',{
            sender:currUser._id,
            receiver: receiver._id
        })

        return request
    }
})