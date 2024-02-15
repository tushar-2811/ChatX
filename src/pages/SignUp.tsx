import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { NavLink, useNavigate} from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { toast } from "sonner"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { SignUpSchema } from "@/validators/auth"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { authSelector } from "@/store/selectors/authSelector"




const SignUp = () => {
  
  const [isLoading , setIsLoading] = useState(false);

  const router = useNavigate();
  const getAuthState = useRecoilValue(authSelector);

  useEffect(() => {
    if(localStorage.getItem("authToken") && getAuthState.isSignedIn){
         router("/app");
    }
 },[])

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",

    }
  })

  async function onSubmit(data: z.infer<typeof SignUpSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:5000/api/v1/auth/sign-up`, {
        email: data.email,
        username: data.userName,
        password: data.password
      });

      if (!response.data.ok) {
        toast(response.data.msg);
        console.log(response.data.msg);
        setIsLoading(false);
        return;
      }

      router("/sign-in");
      toast("Sign Up Successful , Please Sign In");
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.log("error while submitting form", error);
      toast("error while submitting form");
    }
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


              <Button disabled={isLoading} className="bg-black" type="submit">Create Account</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-2">
          <p> Already Have an Account ? </p>
          <NavLink to="/sign-in" >
            <Button 
            disabled={isLoading}
            className="border-2 mx-2 text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 to-pink-600" >
              Sign In
            </Button>
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
