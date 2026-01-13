export const dynamic = "force-dynamic";



import { getServerSession } from "next-auth";
import Category from "../components/Category";
import ItemList from "../components/ItemList";
import Banner from "./_components/Banner";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const { prisma } = await import("@/lib/prisma");
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const items = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      likes: userId
        ? { where: { userId }, select: { id: true } }
        : false,
    },
  });

  const mapped = items.map((item) => ({
    ...item,
    liked: userId ? item.likes.length > 0 : false,
  }));

  return <div>
    <Banner />
    <Category />
    <ItemList items={mapped} />
  </div>;
}
