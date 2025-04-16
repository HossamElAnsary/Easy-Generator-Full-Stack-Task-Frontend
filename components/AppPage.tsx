'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';

export default function AppPage() {
  const { user, logout } = useContext(AuthContext)!;
  const router = useRouter();

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      router.push('/signin');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold mb-8">Welcome to our Application</h1>
      <button
        onClick={handleAuthAction}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {user ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}
