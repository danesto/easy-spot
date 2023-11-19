import { authorizeUser } from '@/queries/user';
import auth, { DefaultUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User as UserModel } from '@prisma/client';
import { decode, encode } from 'next-auth/jwt';

// TODO expose authOptions to seperate object so it can be passed to getServerSession
export const authOptions = {
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
  callbacks: {
    async jwt({ token, session, user }) {
      token = {
        ...token,
        ...user,
      };
      return { ...session, ...token, ...user };
    },
    async session({ session, token, user }) {
      session = {
        ...session,
        user: {
          id: token.id as never,
          organizationId: token.organizationId as number,
          name: token.name,
          email: token.email,
        },
      };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  jwt: { encode, decode },
} satisfies NextAuthOptions;

const authHandler = auth(authOptions);

export { authHandler as GET, authHandler as POST };

declare module 'next-auth' {
  interface User extends UserModel {
    // change the default type of id next-auth provides to match prisma's model
    id: number;
    organizationId: number;
  }
  interface Session {
    user?: DefaultUser & {
      id: number;
      organizationId: number;
    };
  }
}

declare module 'next-auth/jwt/types' {
  interface JWT {
    uid: number;
  }
}

// declare module 'next-auth/session/types' {

// }
