"use client"

import ItemsList from '@/components/shared/items-list/ItemsList'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import DMConversationItems from './_components/DMConversationItems'

type Props = React.PropsWithChildren<{}>

const ConversationLayout = ({children}: Props) => {
  const conversations = useQuery(api.conversations.get)
  return (<>
    <ItemsList title='Conversations'>
          {conversations ? (conversations.length === 0 ? (<p className='w-full h-full flex items-center justify-center'>No Conversation Found</p>): conversations.map((conversation)=>{
             return conversation.conversation.isGroup ?  null :  <DMConversationItems id={conversation.conversation._id} key={conversation.conversation._id} username={conversation.conversation?.name || ''} imageUrl={conversation.conversation?.imageUrl || ''}/>
})) : (<Loader2/>)}
    </ItemsList>
    {children}
    </>
  )
}

export default ConversationLayout