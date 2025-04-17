'use client';

import { FC, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

const Dashboard: FC = () => {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="max-w-md w-full bg-white/75 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Welcome, <span className="text-indigo-600">{user?.name}</span>!
        </h1>
        <p className="text-gray-600 mb-8">
          Your email: <span className="font-medium">{user?.email}</span>
        </p>
        <button
          onClick={logout}
          className="inline-block px-8 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
