import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { prisma } = await import("@/lib/prisma");
  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");

    if (keyword) {
      await prisma.searchKeyword.upsert({
        where: { keyword },
        update: { count: { increment: 1 } },
        create: { keyword },
      });
    }

    const items = await prisma.product.findMany({
      where: {
        isActive: true,

        ...(keyword && {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { brand: { contains: keyword, mode: "insensitive" } },
            { slug: { contains: keyword, mode: "insensitive" } },
          ],
        }),

        ...(category && {
          categoryId: Number(category),
        }),
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        category: true,
      },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
