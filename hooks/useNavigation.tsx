import { MessageSquare, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export const useNavigation = ()=>{
     const pathName = usePathname()

     const paths = useMemo(()=>{
        [
            {
                name:'Conversations',
                href:'/conversations',
                icon:<MessageSquare/>,
                active:pathName.startsWith('/conversations')
            },
            {
                name:'Friends',
                href:'/friends',
                icon:<User/>,
                active:pathName == '/friends'
            }
        ]
     },[pathName])

     return paths
}