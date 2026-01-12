export const dynamic = "force-dynamic";

import NextAuth from "next-auth";

async function handler(req: Request, ctx: any) {
  const { authOptions } = await import("@/lib/auth");
  return NextAuth(authOptions)(req, ctx);
}

export { handler as GET, handler as POST };
