export const dynamic = "force-dynamic";

import SearchContent from "./_components/SearchContent";

export default async function SearchPage() {
  const { prisma } = await import("@/lib/prisma");
  const popularSearch = await prisma.searchKeyword.findMany({
    orderBy: { count: "desc" },
    take: 10,
  });

  return <SearchContent popularSearch={popularSearch} />;
}