'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  accessToken: string | null
  user: { id: string; email: string } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string|null>(null)
  const [user, setUser] = useState(null)

  async function login(email: string, password: string) {

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',      // ← so that cookies (refresh token) get set
      body: JSON.stringify({ email, password }),
    })

    const { accessToken } = await res.json();

    setAccessToken(accessToken)
    setUser(jwtDecode(accessToken))  // { sub: "...", email: "..." }
  }

  function logout() {
    setAccessToken(null)
    setUser(null)
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/signin');
  }

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
