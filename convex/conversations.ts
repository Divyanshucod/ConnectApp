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

        const conversationMemberShip = await ctx.db.query('conversationMembers').withIndex('by_memberId', q => q.eq('memberId',currUser._id)).collect(); // getting the all the 
        // conversations where curr user was a part.

        //getting all conversation the currUser did
        const conversations = await Promise.all(conversationMemberShip?.map(async (membership)=>{
            const conversation = await ctx.db.get(membership.conversationId)
            if(!conversation){
                throw new ConvexError("Conversation could not be found!")
            }
            return conversation;
        }))
        
        // now needs the users who are the part of the curruser conversation
        const conversationWithDetails = await Promise.all(conversations?.map(async (conversation)=>{
                const allConversationMemberShip = await ctx.db.query('conversationMembers').withIndex('by_conversationId',q => q.eq('conversationId',conversation._id)).collect();

                if(conversation.isGroup){
                    return {conversation}
                }
                else{
                   const otherMemberships = allConversationMemberShip.filter((member)=> member.memberId !== currUser._id)[0] // beacause it is a private conversation
                   const otherMember = await ctx.db.get(otherMemberships.memberId)

                   return {conversation,otherMember}
                }
        
        }))
        return conversationWithDetails;
    }
})