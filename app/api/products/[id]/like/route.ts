import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { prisma } = await import("@/lib/prisma");
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "로그인이 필요합니다" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const productId = Number(params.id);

  const exists = await prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (exists) {
    // 좋아요 취소
    await prisma.productLike.delete({
      where: { id: exists.id },
    });

    return NextResponse.json({ liked: false });
  }

  // 좋아요 추가
  await prisma.productLike.create({
    data: { userId, productId },
  });

  return NextResponse.json({ liked: true });
}
