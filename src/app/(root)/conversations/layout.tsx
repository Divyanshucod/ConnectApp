import ItemsList from '@/components/shared/items-list/ItemsList'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationLayout = ({children}: Props) => {
  return (<>
    <ItemsList title='Conversations'>
         Conversation page
    </ItemsList>
    {children}
    </>
  )
}

export default ConversationLayout