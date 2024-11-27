import { Card } from "@/components/ui/card"



const ConversationFallBack = () => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground">
         select/start the Conversation to get started!
    </Card>
  )
}

export default ConversationFallBack