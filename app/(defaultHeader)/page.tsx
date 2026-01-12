export const dynamic = "force-dynamic";



import Category from "../components/Category";
import ItemList from "../components/ItemList";
import Banner from "./_components/Banner";

export default async function Home() {
  const { prisma } = await import("@/lib/prisma");
  const items = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return <div>
    <Banner />
    <Category />
    <ItemList items={items} />
  </div>;
}
