'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInInputs, signInSchema } from '@/utils/schemas/auth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import FormField from '@/components/ui/FormField';
import EyeIconToggle from '@/components/icons/EyeIconToggle';
import AuthHeader from '@/components/AuthHeader';
import { useAuthForm } from '@/hooks/useAuthForm';
import { signin } from '@/services/internal/auth';
import { useNotify } from '@/hooks/useNotify';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '@/contexts/AuthProvider';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const notify = useNotify();
  const { setUser } = useContext(AuthContext)!;
  
  const { register, errors, loading, onSubmit } = useAuthForm<SignInInputs>(
    signInSchema,
    async (data) => {
      try {
        const { accessToken } = await signin({ email: data.email, password: data.password });
        setUser(jwtDecode(accessToken));
        router.push('/');
      } catch (err) {
        notify.error(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    }
  );
  
  return (
    <>
      <AuthHeader
        prompt="Do not have an account?"
        actionText="Sign up"
        href="/auth/signup"
      />

      <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Welcome back
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
            {...register('email')}
            className={clsx(
              'mt-1 block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border',
              errors.email ? 'border-red-500' : 'border-gray-300'
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
          disabled={loading}
          className={`disabled:opacity-50`}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </>
  );
}
