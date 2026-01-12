
import { prisma } from "@/lib/prisma";
import { Item } from "./Item";

export default async function ItemList() {
  const items = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">당신을 위한 추천 아이템</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}