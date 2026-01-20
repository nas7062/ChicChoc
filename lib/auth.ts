import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Kakao from "next-auth/providers/kakao";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 60 * 30 },
  jwt: { maxAge: 60 * 30 },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user?.password) return null;

        const ok = await bcrypt.compare(password, user.password);
        return ok ? user : null;
      },
    }),

    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: { params: { prompt: "select_account" } },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "kakao") return true;
      if (!user?.email) return true;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      if (!existingUser) return true;

      const linkedAccount = await prisma.account.findFirst({
        where: {
          provider: "kakao",
          providerAccountId: account.providerAccountId,
        },
      });

      if (!linkedAccount) {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            type: "oauth",
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
          },
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      // user는 로그인 시점에만 들어오므로 그때만 id 주입
      if (user) token.id = (user as any).id;
      return token;
    },

    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },

  pages: { signIn: "/signin" },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
