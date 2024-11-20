import React, {useEffect, useState} from 'react'


import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import SignInOAuthButtons from '../../additional/googleAuth';
import { useAuthContext } from '../../context/AuthContext';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"; // Make sure these components are imported correctly
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";


import { Link } from 'react-router-dom';

import { axiosInstance } from '../../lib/axios';
import { SignupValidation } from '../../lib/SignupValidation';


const Signup = () => {
  const {setCurrentUserName, setCurrentUserEmail, setIsGuest}=useAuthContext();
  const navigate=useNavigate();
  const list = ["Instant messaging", "Music streaming", "Developed by #Biruk(SE)"];
  const isLoading=false;
  const [typedText, setTypedText] = useState(""); 
  const [index, setIndex] = useState(0); 
  const [charIndex, setCharIndex] = useState(0); 
  const form = useForm<FormData>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      
      name: '',
      username: '',
      email: '',
      password: '',

    },
  });
  useEffect(() => {
    const typingInterval = setInterval(() => {
        if (charIndex < list[index].length) {
            setTypedText(prev => prev + list[index][charIndex]);
            setCharIndex(prev => prev + 1);
        } else {
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % list.length); 
                setCharIndex(0); 
                setTypedText("");
            }, 1500);
        }
    }, 100); 

    return () => clearInterval(typingInterval); 
}, [charIndex, index, list]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response=await axiosInstance.post("/auth/register", {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,  
      });
      if(response.data){
        setCurrentUserName(response.data.name);
        setCurrentUserEmail(response.data.email);
        setIsGuest(false);
      }

      console.log(response.data);
      navigate("/feed");
      
     
    } catch (error) {
      console.log(error);

    }
   
    
    

    
    
  }
  async function handleGuest(){
    try{
      const response=await axiosInstance.get("/auth/guest");
      if(response.data){
        setCurrentUserName(response.data.name);
        setCurrentUserEmail(response.data.email);
        setIsGuest(true);
      }
      console.log(response.data);
      navigate("/feed");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
      

          

          {/* <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2> */}
          <h2 className="text-2xl md:text-2xl font-extrabold text-white leading-tight text-center pt-5 sm:pt-12">
  Create a new account
</h2>
       <p className="text-light-3 small-medium md:base-regular mt-2">Welcome to the future of social media</p>
        


 
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
          {isLoading ? (
              <div className="flex-center gap-2">
                <Loader/>

              </div>
            ) : "Sign up"}
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2">  <SignedIn>
            <SignOutButton/>
        </SignedIn>
        <SignedOut>
            <SignInOAuthButtons/>
        </SignedOut></p>
        <p onClick={handleGuest} className="text-small-regular text-light-2 text-center mt-2 bg-gradient-to-r from-green-500 via-yellow-400 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
  Continue as Guest
</p>


            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link to="/" className="text-primary-500 text-small-semibold ml-1">Sign in</Link>
             
            </p>
        </form>
        </div>  
       
      </Form>
    
     
  )
}

export default Signup;
