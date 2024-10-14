'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { useRegisterUserMutation } from '@/app/Redux/features/Api/UserApi';
import { AuthResponse, RegisterRequest, UserResponse } from '@/app/Redux/features/Types/interfaces';
import { useRouter } from 'next/navigation';
import { MdFileUpload } from "react-icons/md";
import {  motion } from 'framer-motion';
import { RegisterInputVariants, RegisterLableVariants, RegisterVariants } from '@/app/Variants/RegisterVariants';



function Registration() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();
  const router = useRouter(); // Initialize router for navigation



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const registrationData: RegisterRequest = {
      name,
      username,
      password,
    };

    try {
      const response: AuthResponse = await registerUser(registrationData).unwrap();
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      router.push('Home/1'); 

    } catch (err) {
      console.error('Registration error:', err);
    }
  };
  // const ref = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start end", "end end"]
  // });




  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-slate-950 px-4">
      <motion.form
     
      variants={RegisterVariants}
      whileFocus="focus"
      initial="hidden"
      animate="visible"
      exit="exit"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-2xl transition duration-500 ease-in-out transform  hover:scale-105 sm:w-4/5"
      >
        <h2
         className="text-2xl text-white font-semibold mb-4">
          Create Account
         </h2>

        <motion.label htmlFor="name" 
          variants={RegisterInputVariants}
         className="block mb-2 text-white text-sm">
          Name
        </motion.label>
        <motion.input
        variants={RegisterInputVariants}
        whileFocus="focus"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block mb-2 p-3 w-full rounded-lg bg-gray-800 text-white border-none outline-none  "
          placeholder="Enter your name"
        />

       

        <motion.label 
         variants={RegisterLableVariants}
         htmlFor="username" className="block mb-2 text-white text-sm">
          Username
        </motion.label>
        <motion.input
         variants={RegisterInputVariants}
         whileFocus="focus"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-2 p-3 w-full rounded-lg bg-gray-800 text-white border-none outline-none "
          placeholder="Enter your username"
        />

        <motion.label
         variants={RegisterLableVariants}
          htmlFor="password" className="block mb-2 text-white text-sm">
          Password
        </motion.label>
        <motion.input
         variants={RegisterInputVariants}
         whileFocus="focus"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-2 p-3 w-full rounded-lg bg-gray-800 text-white border-none outline-none "
          placeholder="Enter your password"
        />


        <div className="flex flex-col items-center w-full m-4">
          <input
            type="submit"
            className="bg-blue-600 text-white py-3 px-4 rounded-lg cursor-pointer w-full hover:bg-blue-700 transition duration-300 ease-in-out mb-4"
            value={isLoading ? 'Registering...' : 'Register'}
            disabled={isLoading}
          />
          <Link href="/Pages/login" className="text-blue-400 hover:text-blue-300 transition duration-300">
            Already have an account? Login
          </Link>
        </div>


        {isError && <p className="text-red-500 mt-4"> Error: {(error as any).data?.message || 'An error occurred' }</p>}
      </motion.form>      
    </div>
  );
}

export default Registration;
