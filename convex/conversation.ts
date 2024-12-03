import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({

    args:{
        id:v.id('conversations')
    },
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
        const conversation = await ctx.db.get(args.id)
        
        if(!conversation){
            throw new ConvexError('Conversation not found!')
        }
        const membership = await ctx.db.query('conversationMembers').withIndex('by_memberId_conversationId', q => q.eq('memberId',currUser._id).eq('conversationId',conversation._id)).unique(); // getting the all the 
        if(!membership){
            throw new ConvexError("you aren't part of this conversation")
        }
        const allconversationMemberships = await ctx.db.query('conversationMembers').withIndex('by_conversationId',q => q.eq('conversationId',args.id))
        // now needs the users who are the part of the curruser conversation
        // const conversationWithDetails = await Promise.all(allconversationMemberships?.map(async (conversation)=>{
        //         const allConversationMemberShip = await ctx.db.query('conversationMembers').withIndex('by_conversationId',q => q.eq('conversationId',conversation._id)).collect();

        //         if(conversation.isGroup){
        //             return {conversation}
        //         }
        //         else{
        //            const otherMemberships = allConversationMemberShip.filter((member)=> member.memberId !== currUser._id)[0] // beacause it is a private conversation
        //            const otherMember = await ctx.db.get(otherMemberships.memberId)

        //            return {conversation,otherMember}
        //         }
        
        // }))
        // return conversationWithDetails;
    }
})