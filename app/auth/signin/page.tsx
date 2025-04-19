'use client';

import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthProvider';
import { SignInInputs, signInSchema } from '@/utils/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import FormField from '@/components/ui/FormField';
import EyeIconToggle from '@/components/icons/EyeIconToggle';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } =
    useForm<SignInInputs>({ resolver: zodResolver(signInSchema) });
  const router = useRouter();
  const { login } = useContext(AuthContext)!;

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-sm">
            <span className="text-gray-600 mr-2">Do not have an account?</span>
            <Link
              href="/auth/signup"
              className="inline-block px-4 py-2 border border-gray-300 rounded-full text-gray-800 hover:bg-gray-100 transition"
            >
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
            <Input
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

          <FormField
            id="password" 
            label="Password" 
            error={errors.password?.message}
          >
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              aria-invalid={errors.password ? 'true' : 'false'}
              // aria-describedby={errors.password ? 'password-error' : undefined}s
              {...register('password')}
              className={clsx(
                'mt-1 block w-full pr-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                errors.password ? 'border-red-500' : 'border-gray-300'
              )}
            />
            <EyeIconToggle isOpen={showPassword} onClick={() => setShowPassword(s => !s)} />
          </FormField>

          <Button
            type="submit"               
            variant="primary"           
            size="md"                   
            // disabled={loading}
          >
            Log in
            {/* {loading ? 'Logging in...' : 'Log in'} */}
          </Button>
        </form>
      </div>
    </div>
  );
}
