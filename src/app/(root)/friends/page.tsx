
import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'
import ItemsList from '@/components/shared/items-list/ItemsList'
import React from 'react'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
    <ItemsList title='Friends'>
      friends page
    </ItemsList>
    <ConversationFallBack/>
    </>
  )
}

export default FriendsPage