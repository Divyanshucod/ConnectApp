"use client"
import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'
import ItemsList from '@/components/shared/items-list/ItemsList'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import Requests from './_components/Requests'

type Props = {}

const FriendsPage = (props: Props) => {
  const requests = useQuery(api.requests.get)
  return (
    <>
    <ItemsList title='Friends' action={<AddFriendDialog/>}>
      {requests ? requests.length === 0 ? <p className='w-full h-full flex justify-center items-center'>No friend requests found</p> : requests.map((request)=>{
        return <Requests key={request.request._id} id={request.request._id} username={request.sender.username} imageUrl={request.sender.imageUrl} email={request.sender.email}/>
      }): <Loader2 className='h-8 w-8'/>}
    </ItemsList>
    <ConversationFallBack/>
    </>
  )
}

export default FriendsPage