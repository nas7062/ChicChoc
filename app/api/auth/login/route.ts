import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { signToken } from "../jwt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken(String(user.id));

  (await cookies()).set("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({
    user: { id: user.id, email: user.email },
  });
}
