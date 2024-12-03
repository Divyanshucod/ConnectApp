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

        const requestAlreadySent = await ctx.db.query('requests').withIndex('by_receiver_sender', (q) => q.eq('receiver',receiver._id).eq('sender',currUser._id)).unique()

        if(requestAlreadySent){
            throw new ConvexError('request was already send!')
        }

        const requestAlreadyReceived = await ctx.db.query('requests').withIndex('by_receiver_sender', (q) => q.eq('receiver',currUser._id).eq('sender',receiver._id)).unique()

        if(requestAlreadyReceived){
            throw new ConvexError('this user has already sent you a request')
        }
        const friends1 = await ctx.db.query('friends').withIndex('by_user1',(q)=> q.eq('user1',currUser._id)).collect();
        const friends2 = await ctx.db.query('friends').withIndex('by_user2',(q)=> q.eq('user2',currUser._id)).collect();
        
        
        if(friends1.some((friends)=> friends.user1 === receiver._id) || friends2.some((friends)=> friends.user2 === receiver._id)){
            return new ConvexError("You are already a friends!")
        }
        
        const request = await ctx.db.insert('requests',{
            sender:currUser._id,
            receiver: receiver._id
        })

        return request
    }
})

export const deny = mutation({
    args:{
        id:v.id("requests")
    },
    handler:async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new ConvexError('Unauthorized')
        }

        const currUser = await getUserByClerkId({clerkId:identity.subject,ctx})
        if(!currUser){
            throw new ConvexError("User not found")
        }

        const request = await ctx.db.get(args.id)

        if(!request || request.receiver !== currUser._id){
            throw new ConvexError("There was an error denying this requets!")
        }

        await ctx.db.delete(request._id)
    }
})

export const accept = mutation({
    args:{
        id:v.id('requests')
    },
    handler:async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new ConvexError('Unauthorized')
        }

        const currUser = await getUserByClerkId({clerkId:identity.subject,ctx})
        if(!currUser){
            throw new ConvexError("User not found")
        }
        const request = await ctx.db.get(args.id)

        if(!request || request.receiver !== currUser._id){
            return new ConvexError("there was an error accepting this request!")
        }

        const conversationId = await ctx.db.insert('conversations',{
            isGroup:false
        })

        const friends = await ctx.db.insert('friends',{
            user1:currUser._id,
            user2:request.sender,
            conversationId:conversationId
        })

        await ctx.db.insert('conversationMembers',{
            memberId:currUser._id,
            conversationId
        })

        await ctx.db.insert('conversationMembers',{
            memberId:request.sender,
            conversationId
        })
        await ctx.db.delete(request._id)
    }
})