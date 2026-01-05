import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // 비밀번호 비교
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // JWT 발급
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return Response.json({ token });
}
