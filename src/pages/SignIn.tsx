
import { Button } from "@/components/ui/button"
import {NavLink, useNavigate} from 'react-router-dom'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { SignInSchema} from "@/validators/auth"

import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { authSelector } from "@/store/selectors/authSelector"




const SignIn = () => {
 
 const [isLoading , setIsLoading] = useState(false);
 const setAuthState = useSetRecoilState(authSelector);
 const router = useNavigate();
 const getAuthState = useRecoilValue(authSelector);


 useEffect(() => {
    if(localStorage.getItem("authToken") && getAuthState.isSignedIn){
         router("/app");
    }
 },[])

  const form = useForm<z.infer<typeof SignInSchema>>({
      resolver : zodResolver(SignInSchema),
      defaultValues : {
        userName : "",
        password : "",
        
      }
  })

 async function onSubmit(data : z.infer<typeof SignInSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:5000/api/v1/auth/sign-in` , {
         username : data.userName,
         password : data.password
      });

      if(!response.data.ok) {
         toast(response.data.msg);
         console.log(response.data.msg);
         setIsLoading(false);
         return;
      }
      
      localStorage.setItem("authToken" , response.data.token);
      localStorage.setItem("userName" , response.data.user.username);
      setAuthState({isSignedIn : true});
      router("/app");
      toast("Sign In Successful");
      setIsLoading(false);
     
    } catch (error) {
      console.log("error while submitting form" , error);
      toast("error while submitting form");
      setIsLoading(false);
    }
  }

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " >
      <Card className="w-[450px]">
      <CardHeader>
        <CardTitle> Enter the Zone </CardTitle>
        <CardDescription>Someone is waiting for you</CardDescription>
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
                <Input placeholder="Enter Username" {...field} />
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


        <Button disabled={isLoading} className="bg-black" type="submit">Enter the Room</Button>
      </form>
    </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-2">
         <p> Create a new Account ? </p>
         <NavLink to="/sign-up" >
           <Button disabled={isLoading} className="border-2 mx-2 text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 to-pink-600" >
            Sign Up
          </Button>
         </NavLink>
      </CardFooter>
    </Card>
    </div>
  )
}

export default SignIn
