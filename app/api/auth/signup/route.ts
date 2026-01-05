import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signToken } from "../jwt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return Response.json({ error: "Email exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed, name },
  });

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
