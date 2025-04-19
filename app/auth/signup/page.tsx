'use client';

import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpInputs } from '@/utils/schemas/auth';
import { useNotify } from '@/hooks/useNotify';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import clsx from 'clsx';
import EyeIconToggle from '@/components/icons/EyeIconToggle';


export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInputs>({ resolver: zodResolver(signUpSchema) });
  const router = useRouter();
  const { login } = useContext(AuthContext)!;

  const notify = useNotify();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data: SignUpInputs) => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        notify.error(`SignUp Failed: ${err.message}`);
        throw new Error(err.message || 'Sign‑up failed');
      }
      notify.success(`User Registered Successfuly`);

      await login(data.email, data.password);
      router.push('/');
    } catch (err: unknown) {
      console.log(err);
      // notify.error(`Joined the Catch: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* header */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-sm">
            <span className="text-gray-600 mr-2">Already have an account?</span>
            <Link
              href="/auth/signin"
              className="inline-block px-4 py-2 border border-gray-300 rounded-full text-gray-800 hover:bg-gray-100 transition"
            >
              Sign in
            </Link>
          </div>
        </header>

        {/* title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Sign up
        </h1>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              disabled={loading}
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

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              disabled={loading}
              className={`
                mt-1 block w-full px-4 py-2 rounded-md
                border ${errors.name ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
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
              disabled={loading}
              className={clsx(
                'mt-1 block w-full pr-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border',
                errors.password ? 'border-red-500' : 'border-gray-300'
              )}
            />
            <EyeIconToggle isOpen={showPassword} onClick={() => setShowPassword(s => !s)} />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            size="md"      
            disabled={loading}
            className={`disabled:opacity-50`}
          >
            {loading ? 'Signing up…' : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
  );
}
