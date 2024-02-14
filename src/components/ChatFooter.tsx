
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
import { ClipLoader } from "react-spinners";
import { toast } from "sonner"
import axios from "axios"
import { useRecoilState } from "recoil"
import { messagesSelector } from "@/store/selectors/messageSelector"

interface ChatFooterParams {
  convoId ?: string 
  socket : any

}

const ChatFooter = ({convoId , socket }: ChatFooterParams) => {

   const [messages , setMessages] = useRecoilState(messagesSelector);

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
               message : response.data.newMessage.body
            }
            const newMessage = response.data.newMessage;
            setMessages((prevState:any) => ({
              ...prevState,
              messages : [...prevState.messages , newMessage]
            }))
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

  )
}

export default ChatFooter
