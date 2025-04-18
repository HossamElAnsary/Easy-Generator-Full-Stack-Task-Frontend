'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { id: string; email: string, name: string } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ initialUser, children }: { children: ReactNode; initialUser: any }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(initialUser)

  async function login(email: string, password: string) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',      // ← so that cookies (refresh token) get set
      body: JSON.stringify({ email, password }),
    })

    const { accessToken } = await res.json();
    setUser(jwtDecode(accessToken as string))
  }

  function logout() {
    setUser(null)
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/auth/signin');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
