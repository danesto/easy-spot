import { authorizeUser } from '@/queries/user';
import auth, { DefaultUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User as UserModel } from '@prisma/client';

const authHandler = auth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your-email@easyspot.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await authorizeUser({
          email: credentials?.email,
          password: credentials?.password,
        });

        return user || null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
});

export { authHandler as GET, authHandler as POST };

declare module 'next-auth' {
  interface User extends UserModel {
    // change the default type of id next-auth provides to match prisma's model
    id: number;
  }
  interface Session {
    user?: DefaultUser & {
      id: number;
    };
  }
}

declare module 'next-auth/jwt/types' {
  interface JWT {
    uid: number;
  }
}
