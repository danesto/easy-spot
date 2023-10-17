'use client';

import { User } from '@prisma/client';
import { createContext } from 'react';

const AuthContext = createContext<Partial<User> | null>(null);

interface AuthProviderProps {
  user: Partial<User> | null;
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children, user }: AuthProviderProps) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
