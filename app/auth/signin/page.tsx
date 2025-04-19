'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';
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

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { extractToken } = useContext(AuthContext)!;
  const notify = useNotify();

  const { register, errors, loading, onSubmit } = useAuthForm<SignInInputs>(
    signInSchema,
    async (data) => {
      try {
        const res = await signin({ email: data.email, password: data.password });
        extractToken(res.accessToken);
  
        router.push('/');
      } catch (err) {
        notify.error(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    }
  );
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
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
      </div>
    </div>
  );
}
