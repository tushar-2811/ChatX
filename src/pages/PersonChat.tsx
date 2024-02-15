
import { useEffect, useMemo} from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRecoilValue,  useRecoilState} from "recoil";
import { messagesSelector } from "@/store/selectors/messageSelector";
import io from 'socket.io-client'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { conversationSchema } from '@/validators/text'
import { zodResolver } from '@hookform/resolvers/zod'


import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const ENDPOINT = "http://localhost:5000";


const PersonChat = () => {


  const allMessages = useRecoilValue(messagesSelector);
  // const setMessages = useSetRecoilState(messagesSelector);
  const [messages , setMessages] = useRecoilState(messagesSelector);
 
  const params = useParams();
  const currentUserId = localStorage.getItem("userID");
  const convoId = params.id;

  const socket = useMemo(() => {
    return io(ENDPOINT);
  } , [])

 
  useEffect(() => {
    // socket.emit('setup' , currentUserId);

    async function getAllMessages() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/messages/all-messages/${String(convoId)}`);
        setMessages({
          messages : response.data.conversationMessages
        });


        socket.emit("join-chat" , convoId);
      } catch (error) {
        console.log("error while getting all messages", error);
      } 
    }
    getAllMessages();
  }, [convoId])

  useEffect(() => {
    socket.on("recieve-message" , (newMessage) => {
      setMessages((prevState:any) => ({
        ...prevState,
        messages : [...prevState.messages , newMessage]
      }))
    } )
   
  },[socket , setMessages])

 

  type PromptFormInput = z.infer<typeof conversationSchema>;
  const form = useForm<PromptFormInput>({
      resolver : zodResolver(conversationSchema),
      defaultValues : {
          prompt : ""
      }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async(data : z.infer<typeof conversationSchema>) => {
      try {
        if(!convoId){
           toast("no convo it");
           return;
        }
        const response = await axios.post(`http://localhost:5000/api/v1/messages/send-new-message/${String(convoId)}` , {
           messageContent : data.prompt,
           fromUserId : String(localStorage.getItem("userID")),
           toUserId : ""
        })
      
        if(response.data.ok) {
          const data = {
             roomId : convoId,
             message : response.data.newMessage
          }
          const newMessage = response.data.newMessage;
          setMessages((prevState:any) => ({
            ...prevState,
            messages : [...prevState.messages , newMessage]
          }))
          socket.emit("send-message" , data);
          toast("message send");

        }else{
          toast("couldn't send the message");
        }
        
      } catch (error) {
         console.log("error in sending message");
         toast("error in sending message");
      }finally{
        form.reset({
          prompt : ""
        });
        
      }
    
  }


  return (
    <>
      <div className="border-2 border-green-600 h-[70%] mx-8 flex flex-col">
        {/* header of chat */}


        {/* Content area */}
        <div className="flex-1 overflow-y-scroll scroll-auto mx-4 max-w-[1024]" >
          {/* Add your chat content here */}
          
           
              <>
                <ScrollArea className="flex flex-col p-4" >
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
            
          

        </div>

        {/* Footer */}

      </div>
      <div className="sticky bottom-2 ">
      <div className="px-4 lg:px-8 ">
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
            rounded-lg 
            border-2
            border-black 
            w-full 
            p-4 
            px-3 
            md:px-6 
            focus-within:shadow-sm
            grid
            grid-cols-12
            gap-2
          "
        >
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10">
                <FormControl className="m-0 p-0">
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading}
                    placeholder="Write message..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="col-span-12 lg:col-span-2 w-full bg-black " type="submit" disabled={isLoading} size="icon">
            Send {isLoading ? <ClipLoader color="white" size={30} className="mx-4" /> : ""}
          </Button>
        </form>
      </Form>
    </div>
    </div>
      </div>
    </>
  );
};

export default PersonChat;
