export const dynamic = "force-dynamic";

import NextAuth from "next-auth";

const handler = async (...args: Parameters<typeof NextAuth>) => {
  const { authOptions } = await import("@/lib/auth");
  return NextAuth(authOptions)(...args);
};

export { handler as GET, handler as POST };
