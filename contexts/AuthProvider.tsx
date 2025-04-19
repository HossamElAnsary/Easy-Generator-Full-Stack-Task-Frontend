'use client';

import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { id: string; email: string, name: string } | null
  extractToken: (token: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ initialUser, children }: { children: ReactNode; initialUser: any }) => {
  const [user, setUser] = useState<any>(initialUser)

  async function extractToken(token: string) {
    setUser(jwtDecode(token))
  }

  return (
    <AuthContext.Provider value={{ user, extractToken }}>
      {children}
    </AuthContext.Provider>
  );
};
