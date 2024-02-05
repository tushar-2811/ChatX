
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

const ChatFooter = () => {
    type PromptFormInput = z.infer<typeof conversationSchema>;
    const form = useForm<PromptFormInput>({
        resolver : zodResolver(conversationSchema),
        defaultValues : {
            prompt : ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(data : z.infer<typeof conversationSchema>) => {
        console.log(data);
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
            Send
          </Button>
        </form>
      </Form>
    </div>
    </div>

  )
}

export default ChatFooter
