'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

type SignUpInputs = {
  email: string;
  name: string;
  password: string;
};

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInputs>();
  const router = useRouter();
  const { login } = useContext(AuthContext)!;

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    console.log('Sign up data:', data);
    // Normally, call your API endpoint here.
    login({ email: data.email, name: data.name });
    router.push('/');
  };

  // Regex to enforce: 8+ characters, at least one letter, one number, and one special character.
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: { 
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 
                message: 'Enter a valid email' 
              } 
            })}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register('name', { 
              required: 'Name is required', 
              minLength: { value: 3, message: 'Name must be at least 3 characters' } 
            })}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required', 
              pattern: { 
                value: passwordPattern, 
                message: 'Password must be 8 characters long and include at least one letter, one number, and one special character' 
              } 
            })}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Sign Up
        </button>
      </form>
    </div>
  );
}
