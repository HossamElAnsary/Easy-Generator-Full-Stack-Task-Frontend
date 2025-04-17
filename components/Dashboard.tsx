'use client';

import { FC, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

const Dashboard: FC = () => {
  const { user, logout } = useContext(AuthContext)!;
  console.log("From the Welcome Page",user)
 
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold mb-8">
        Welcome, {user?.email}!
      </h1>
      <button
        onClick={() => logout()}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Logout
      </button>
    </div>

  );
}

export default Dashboard;