'use client';

import { FC, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { logout } from '@/utils/session';
import Button from './ui/Button';

const Dashboard: FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="max-w-md w-full bg-white/75 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Welcome, <span className="text-indigo-600">{user?.name}</span>!
        </h1>
        <p className="text-gray-600 mb-8">
          Your email: <span className="font-medium">{user?.email}</span>
        </p>
        <Button
          onClick={logout}
          size='md'
          variant='secondary'
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
