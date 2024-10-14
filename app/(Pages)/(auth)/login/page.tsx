'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { useLoginUserMutation } from "../../../Redux/features/Api/UserApi";
import { LoginRequest } from '@/app/Redux/features/Types/interfaces';
import { useRouter } from 'next/navigation';



function Login() {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const loginData: LoginRequest = {
      username,
      password,
    };

    try {
      const response = await loginUser(loginData).unwrap();
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      router.push('Home/1'); 
    } catch (err) {
      console.error('Login error:', (error as any).data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-2xl transition duration-500 ease-in-out transform hover:scale-105 sm:w-4/5"
      >
        <h2 className="text-2xl text-white font-semibold mb-6">Login</h2>

        <label htmlFor="username" className="block mb-2 text-white text-sm">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-4 p-3 w-full rounded-lg bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter your username"
        />

        <label htmlFor="password" className="block mb-2 text-white text-sm">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-4 p-3 w-full rounded-lg bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter your password"
        />

        {isError && (
          <p className="text-red-500 mb-4"> Error: {(error as any).data?.message || 'An error occurred'}</p>
        )}

        <div className="flex flex-col items-center w-full">
          <input
            type="submit"
            className="bg-blue-600 text-white py-3 px-4 rounded-lg cursor-pointer w-full hover:bg-blue-700 transition duration-300 ease-in-out mb-4"
            value={isLoading ? 'Logging in...' : 'Login'}
            disabled={isLoading}
          />
          <Link href="/Pages/register" className="text-blue-400 hover:text-blue-300 transition duration-300">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
