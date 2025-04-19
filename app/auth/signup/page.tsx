'use client';

import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpInputs } from '@/utils/schemas/auth';
import { useNotify } from '@/hooks/useNotify';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import clsx from 'clsx';
import EyeIconToggle from '@/components/icons/EyeIconToggle';
import AuthHeader from '@/components/AuthHeader';


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
        notify.error(`${err.message}`);
        throw new Error(err.message );
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
        <AuthHeader
          prompt="Already have an account?"
          actionText="Sign in"
          href="/auth/signin"
        />

        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Sign up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            id="email"
            label="Email"
            error={errors.email?.message}
          >
            <Input
              id="email"
              type="email"
              disabled={loading}
              {...register('email')}
              className={clsx(
                'mt-1 block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border',
                errors.email ? 'border-red-500' : 'border-gray-300'
              )}
            />
          </FormField>
          
          <FormField
            id="name"
            label="Name"
            error={errors.name?.message}
          >
            <Input
              id="name"
              type="text"
              disabled={loading}
              {...register('name')}
              className={clsx(
                'mt-1 block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border',
                errors.name ? 'border-red-500' : 'border-gray-300'
              )}
            />
          </FormField>

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
