
import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'
import ItemsList from '@/components/shared/items-list/ItemsList'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
    <ItemsList title='Friends' action={<AddFriendDialog/>}>
      friends page
    </ItemsList>
    <ConversationFallBack/>
    </>
  )
}

export default FriendsPage