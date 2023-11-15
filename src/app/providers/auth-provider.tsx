'use client';

import { Organization, User } from '@prisma/client';
import { createContext, useEffect, useState } from 'react';

type AuthUser = Partial<(User & { organization: Organization }) | null>;

const AuthContext = createContext<AuthUser>(null);

interface AuthProviderProps {
  user: AuthUser;
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children, user }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser>(null);

  useEffect(() => {
    console.log(user);
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
