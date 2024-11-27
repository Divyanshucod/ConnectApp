"use client"
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React, { act } from 'react'
import { useConversation } from '../../../../hooks/useConversation'

type Props = React.PropsWithChildren<{
    title:string,
    action?:React.ReactNode
}>

const ItemsList = ({children,title,action}: Props) => {
    const {isActive} = useConversation()
  return (
    <Card className={cn('hidden h-full w-full lg:flex-none lg:w-80 p-2',{
        block:!isActive,
        'lg:block':isActive
    })}>
         <div className='mb-4 flex items-center justify-between'>
            <h1 className='font-semibold tracking-tight text-2xl'>{title}</h1>
            {action ? action :null}
         </div>
         <div className='w-full h-full flex flex-col items-center gap-2 justify-start'>{children}</div>
    </Card>
  )
}

export default ItemsList