import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };