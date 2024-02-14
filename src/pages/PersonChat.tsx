import ChatFooter from "@/components/ChatFooter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messagesSelector } from "@/store/selectors/messageSelector";


const PersonChat = () => {

  const allMessages = useRecoilValue(messagesSelector);
  const setMessages = useSetRecoilState(messagesSelector)
  const [isLoading, setIsLoading] = useState(false);


  const params = useParams();
  const currentUserId = localStorage.getItem("userID");
  const convoId = params.id;

  useEffect(() => {
    async function getAllMessages() {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/messages/all-messages/${String(convoId)}`);
        setMessages({
          messages : response.data.conversationMessages
        });
        setIsLoading(false);
 
      } catch (error) {
        console.log("error while getting all messages", error);
      } 
    }
    getAllMessages();
  }, [convoId])

  return (
    <>
      <div className="border-2 border-green-600 h-[70%] mx-8 flex flex-col">
        {/* header of chat */}


        {/* Content area */}
        <div className="flex-1 overflow-y-hidden mx-4 max-w-[1024]">
          {/* Add your chat content here */}
          {
            isLoading ? (
              <div className="flex justify-center items-center text-center mt-10">
                <ClipLoader color="black" size={40} />
              </div>
            ) : (
              <>
                <ScrollArea className="flex flex-col max-h-96 overflow-y-auto p-4">
                  {
                    allMessages && allMessages.messages.map((message: any) => {
                      return (
                        <div key={message.id} className={`
                        flex
                        ${message.senderId === currentUserId ? 'ml-auto' : 'mr-auto'}
                        bg-gray-300
                        px-2
                        my-0.5
                        rounded-lg
                        max-w-3/4
                        break-words
                
                         `}>
                          {message.body}
                        </div>
                      )
                    })
                  }
                </ScrollArea>
              </>
            )
          }

        </div>

        {/* Footer */}

      </div>
      <div className="sticky bottom-2 ">
        <ChatFooter convoId={convoId}  />
      </div>
    </>
  );
};

export default PersonChat;
