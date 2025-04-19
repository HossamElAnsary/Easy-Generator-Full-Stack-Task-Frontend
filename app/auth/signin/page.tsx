'use client';

import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@/contexts/AuthProvider';
import { SignInInputs, signInSchema } from '@/utils/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';


export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignInInputs>({ resolver: zodResolver(signInSchema) })
  const router = useRouter();
  const { login } = useContext(AuthContext)!;

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    await login(data.email,data.password);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header: logo + sign‑up link */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-sm">
            <span className="text-gray-600 mr-2">Do not have an account?</span>
            <Link href="/auth/signup" className="inline-block px-4 py-2 border border-gray-300 rounded-full text-gray-800 hover:bg-gray-100 transition">
              Sign up
            </Link>
          </div>
        </header>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Welcome back
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`
                mt-1 block w-full px-4 py-2 rounded-md
                border ${errors.email ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`
                mt-1 block w-full px-4 py-2 rounded-md
                border ${errors.password ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(s => !s)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              tabIndex={-1}
            >
              {showPassword
                ? <EyeSlashIcon className="h-5 w-5" />
                : <EyeIcon className="h-5 w-5" />
              }
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 text-white text-base font-medium rounded-full
              bg-gradient-to-r from-purple-500 to-blue-500
              hover:opacity-90 transition
            "
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
