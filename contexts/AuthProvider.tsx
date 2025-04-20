'use client';

import React, { createContext, useState, ReactNode } from 'react';

export interface User { 
  id: string; 
  email: string; 
  name: string; 
};

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ initialUser, children }: { children: ReactNode; initialUser: User | null }) => {
  const [user, setUser] = useState<User | null>(initialUser ?? null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
