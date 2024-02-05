import { Button } from "./ui/button"

interface ChatHeaderParams {
    name : string
}

const ChatHeader = ({name} : ChatHeaderParams) => {
  return (
    <div className="w-full text-white flex justify-between items-center px-16 rounded-xl bg-black h-16" >
        <div>
            <h1> {name} </h1>
        </div>
        <div>
           <Button className="bg-black border-2 border-white hover:bg-white hover:text-black" >
                Go Offline 
           </Button>
        </div>
    </div>
  )
}

export default ChatHeader
