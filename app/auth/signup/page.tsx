'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';
import { signUpSchema, SignUpInputs } from '@/utils/schemas/auth';
import { useNotify } from '@/hooks/useNotify';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import clsx from 'clsx';
import EyeIconToggle from '@/components/icons/EyeIconToggle';
import AuthHeader from '@/components/AuthHeader';
import { useAuthForm } from '@/hooks/useAuthForm';
import { signin, signup } from '@/services/internal/auth';
import { getUser } from '@/utils/session';


export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(AuthContext)!;
  const notify = useNotify();

  const { register, errors, loading, onSubmit } = useAuthForm<SignUpInputs>(
    signUpSchema,
    async (data) => {
      try {
        await signup(data);
        notify.success('Registered successfully!');
        
        const { accessToken } = await signin({ email: data.email, password: data.password });
        setUser(await getUser(accessToken));

        router.push('/');
      } catch (err) {
        notify.error(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
      
    }
  );

  return (
    <>
      <AuthHeader
        prompt="Already have an account?"
        actionText="Sign in"
        href="/auth/signin"
      />
      <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Sign up
      </h1>
      <form onSubmit={onSubmit} className="space-y-6">
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
            aria-describedby={errors.password ? 'password-error' : undefined}
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
    </>
  );
}
