import React, { PropsWithChildren } from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Check, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutationState } from '../../../../../hooks/useMutationState'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

type Props = PropsWithChildren<{
    id: Id<'requests'>,
    username:string,
    email:string,
    imageUrl:string
}>

const Requests = ({id,username,email,imageUrl}:Props) => {
    const {mutate:denyRequest,pending:denyPending} = useMutationState(api.request.deny)
  return (
    <Card className='w-full p-2 flex flex-row items-center justify-between gap-2'>
       <div className='flex items-center gap-4 truncate'>
        <Avatar>
            <AvatarImage src={imageUrl}/>
            <AvatarFallback>
                <User/>
            </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            <p className="text-xs text-muted-foreground truncate">
                {email}
            </p>
        </div>
       </div>
       <div className='flex items-center gap-2'> 
         <Button size='icon' disabled={denyPending} onClick={()=> {}}>
            <Check/>
         </Button>
         <Button size='icon' variant='destructive' disabled={denyPending} onClick={()=> denyRequest({id}).then(()=> toast.success("friend request denied")).catch((error)=> {toast.error(error instanceof ConvexError ? error.data : "unknown error")})}>
            <X className='h-4 w-4'/>
         </Button>
       </div>
    </Card>
  )
}

export default Requests