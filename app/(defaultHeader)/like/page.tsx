export const dynamic = "force-dynamic";

import ItemList from "@/app/components/ItemList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function LikePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return <div className="text-sm text-gray-500">로그인이 필요해요.</div>;
  }

  const { prisma } = await import("@/lib/prisma");

  const likes = await prisma.productLike.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { product: { include: { category: true } } },
  });

  const items = likes.map((l) => ({ ...l.product, liked: true }));

  return (
    <div>
      <p className="text-sm text-gray-500">찜한 아이템</p>
      <ItemList items={items} />
    </div>
  );
}
