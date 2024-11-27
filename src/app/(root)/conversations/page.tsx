import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'

import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationsPage = (props: Props) => {
  return (<>
    <ConversationFallBack/>
   </>
  )
}

export default ConversationsPage