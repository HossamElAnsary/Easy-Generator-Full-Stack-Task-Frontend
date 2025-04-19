'use client';

import { useNotify } from '@/hooks/useNotify';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { id: string; email: string, name: string } | null
  extractToken: (token: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ initialUser, children }: { children: ReactNode; initialUser: any }) => {
  const [user, setUser] = useState<any>(initialUser)
  const notify = useNotify();

  async function extractToken(token: string) {
    
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',      // ← so that cookies (refresh token) get set
    //   body: JSON.stringify({ email, password }),
    // })

    // if (!res.ok) {
    //   const err = await res.json();
    //   notify.error(`${err.message}`);
    //   throw new Error(err.message );
    // }

    // const { accessToken } = await res.json();
    setUser(jwtDecode(token as string))
  }

  return (
    <AuthContext.Provider value={{ user, extractToken }}>
      {children}
    </AuthContext.Provider>
  );
};
