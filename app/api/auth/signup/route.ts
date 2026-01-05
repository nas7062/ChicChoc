import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return Response.json({ error: "Email exists" }, { status: 400 });
  }

  // 2. 비밀번호 해싱
  const hashed = await bcrypt.hash(password, 10);

  // 3. DB 저장
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashed,
    },
  });

  const session = await createSession(user.id);

  return Response.json({ userId: user.id, token: session.token });
}
