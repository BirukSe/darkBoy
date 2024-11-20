import { FormData } from './types';
import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import SignInOAuthButtons from '../../additional/googleAuth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

import { axiosInstance } from '../../lib/axios';
import { OppValidation } from '../../lib/OppValidation';

const Signin = () => {
  const { setCurrentUserName, setCurrentUserEmail, setIsGuest } = useAuthContext();
  const navigate = useNavigate();
  const list = ['Instant messaging', 'Connect in real time', 'Developed by #Biruk(SE)'];
  const isLoading = false;
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(OppValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < list[index].length) {
        setTypedText((prev) => prev + list[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % list.length);
          setCharIndex(0);
          setTypedText('');
        }, 1500);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [charIndex, index]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      console.log('Submitting:', values); // Debugging
      const res = await axiosInstance.post('/auth/check', { username: values.username });

      if (res.data) {
        navigate('/admin');
        return;
      }

      const response = await axiosInstance.post('/auth/login', {
        username: values.username,
        password: values.password,
      });

      console.log('Login response:', response.data); // Debugging
      if (response.data) {
        setCurrentUserName(response.data.name);
        setCurrentUserEmail(response.data.email);
        setIsGuest(false);
        navigate('/feed');
      }
    } catch (error) {
      console.error('Error during login', error); // Debugging
    }
  };

  const handleGuest = async () => {
    navigate('/feed');
    
  };

  return (
    <>
      <h1
        id="header-text"
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 drop-shadow-lg"
      >
        {typedText}
      </h1>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <h2 className="text-2xl md:text-2xl font-extrabold text-white leading-tight text-center pt-5 sm:pt-12">
            Login to your account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">To continue enter your details</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
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

            <Button type="submit" className="shad-button_primary bg-red-200">
              Sign in
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              <SignedIn>
                <SignOutButton />
              </SignedIn>
              <SignedOut>
                <SignInOAuthButtons />
              </SignedOut>
            </p>

            <p
              onClick={handleGuest}
              className="text-small-regular text-light-2 text-center mt-2 bg-gradient-to-r from-green-500 via-yellow-400 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Continue as Guest
            </p>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Don't have an account?
              <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default Signin;
