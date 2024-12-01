import { useQuery } from "convex/react"
import { MessageSquare, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { api } from "../convex/_generated/api"

export const useNavigation = ()=>{
     const pathName = usePathname()
     const requestCount = useQuery(api.requests.count)
     const paths = useMemo(()=>(
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
                active:pathName == '/friends',
                count:requestCount
            }
        ]
    ),[pathName,requestCount])

     return paths;
}