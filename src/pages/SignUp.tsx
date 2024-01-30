
import { Button } from "@/components/ui/button"
import {NavLink} from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { SignUpSchema } from "@/validators/auth"

import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"




const SignUp = () => {


  const form = useForm<z.infer<typeof SignUpSchema>>({
      resolver : zodResolver(SignUpSchema),
      defaultValues : {
        userName : "",
        email : "",
        password : "",
        
      }
  })

  function onSubmit(data : z.infer<typeof SignUpSchema>) {
    console.log(data);
  }

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " >
      <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join the coolest platform ever</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Choose a Cool Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button className="bg-black" type="submit">Create Account</Button>
      </form>
    </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-2">
         <p> Already Have an Account ? </p>
         <NavLink to="/sign-in" >
           <Button className="border-2 mx-2 text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 to-pink-600" >
            Sign In
          </Button>
         </NavLink>
      </CardFooter>
    </Card>
    </div>
  )
}

export default SignUp
