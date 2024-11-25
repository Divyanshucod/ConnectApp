import { useParams } from "next/navigation"
import { useMemo } from "react";

export const useConversation = ()=>{
    const params = useParams();

    const conversationId = useMemo(()=>
          params?.conversationid || ("" as string)
    ,[params?.conversationid])

    const isActive = useMemo(()=> 
        !!conversationId,[conversationId])

    return {
        isActive,conversationId
    }
}