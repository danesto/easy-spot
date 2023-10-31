'use client';

import { User } from '@prisma/client';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext<Partial<User> | null>(null);

interface AuthProviderProps {
  user: Partial<User> | null;
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children, user }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    if (user) {
      setAuthUser(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
