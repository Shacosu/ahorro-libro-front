import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.users.findFirst({ where: { email: credentials.email } });
        console.log(user);
        if (!user) return null;
        const isValidPassword = await compare(credentials.password.toString(), user.password.toString());
        if (!isValidPassword) {
          return null;
        }

        return user;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
    verifyRequest: '/verify-request',
    newUser: '/new-user'
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          plan: token.plan,
          userId: token.userId
        }
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.plan = user.plan;
        token.userId = user.id;
      }
      return token;
    }
  }
})