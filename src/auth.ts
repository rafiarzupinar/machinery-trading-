import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
      secret: process.env.AUTH_SECRET || "supersecretkey123",
      trustHost: true,
      providers: [
            Credentials({
                  credentials: {
                        email: {},
                        password: {},
                  },
                  authorize: async (credentials) => {
                        if (!credentials?.email || !credentials?.password) {
                              return null;
                        }

                        const email = credentials.email as string;
                        const password = credentials.password as string;

                        try {
                              const user = await prisma.user.findUnique({
                                    where: {
                                          email,
                                    },
                              });

                              if (!user) {
                                    return null;
                              }

                              const isPasswordValid = await compare(password, user.password);

                              if (!isPasswordValid) {
                                    return null;
                              }

                              return {
                                    id: user.id,
                                    email: user.email,
                                    name: user.name,
                              };
                        } catch (error) {
                              return null;
                        }
                  },
            }),
      ],
      pages: {
            signIn: '/login',
      },
      callbacks: {
            async jwt({ token, user }) {
                  if (user) {
                        token.id = user.id;
                  }
                  return token;
            },
            async session({ session, token }) {
                  if (session.user) {
                        session.user.id = token.id as string;
                  }
                  return session;
            },
      },
});
