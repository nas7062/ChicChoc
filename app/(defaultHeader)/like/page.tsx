export const dynamic = "force-dynamic";

import ItemList from "@/app/components/ItemList";
export default async function LikePage() {
  const { prisma } = await import("@/lib/prisma");
  const items = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return (
    <div>
      <p className="text-sm text-gray-500">찜한 아이템</p>
      <ItemList items={items} />
    </div>
  )
}