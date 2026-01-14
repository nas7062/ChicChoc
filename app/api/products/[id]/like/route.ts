import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { prisma } = await import("@/lib/prisma");
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = Number(params.id);
  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }

  const userId = session.user.id;

  try {
    const existing = await prisma.productLike.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
      select: { id: true },
    });

    if (existing) {
      await prisma.productLike.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ liked: false });
    }

    await prisma.productLike.create({
      data: { userId, productId },
    });

    return NextResponse.json({ liked: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
