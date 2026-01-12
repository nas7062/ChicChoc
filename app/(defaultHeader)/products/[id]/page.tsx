export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import ProductDetailClient from "./_components/ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    notFound();
  }

  const { prisma } = await import("@/lib/prisma");
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
