'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

type SignInInputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInInputs>();
  const router = useRouter();
  const { login } = useContext(AuthContext)!;

  const onSubmit: SubmitHandler<SignInInputs> = (data) => {
    console.log('Sign in data:', data);
    // Normally, call your API endpoint here.
    login({ email: data.email });
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-3xl font-semibold mb-6">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
}
