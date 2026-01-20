export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const { prisma } = await import("@/lib/prisma");
  const session = await auth();
  
  try {
    const items = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        category: true,
        likes: session?.user
          ? { where: { userId: session.user.id }, select: { id: true } }
          : false,
      },
    });
    const mapped = items.map((item) => ({
      ...item,
      liked: session?.user ? item.likes.length > 0 : false,
    }));
    return NextResponse.json({ items: mapped });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
