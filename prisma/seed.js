import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Category 생성
  const categories = await prisma.category.createMany({
    data: [
      { id: 1, name: "신발", slug: "shoes" },
      { id: 2, name: "의류", slug: "clothing" },
      { id: 3, name: "전자기기", slug: "electronics" },
      { id: 4, name: "생활용품", slug: "home-goods" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Categories seeded");

  // 2️⃣ Product 50개 생성
  const products = Array.from({ length: 50 }).map((_, i) => {
    const categoryId = (i % 4) + 1;

    return {
      title: `샘플 상품 ${i + 1}`,
      slug: `sample-product-${i + 1}`,
      brand: ["NIKE", "ADIDAS", "APPLE", "DYSON"][i % 4],
      imageUrl: `https://picsum.photos/seed/product-${i + 1}/600/600`,
      price: 50000 + i * 1000,
      discountRate: (i % 5) * 5,
      rating: 4 + (i % 10) * 0.1,
      reviewCount: 10 + i * 3,
      stock: i % 7 === 0 ? 0 : 20,
      isActive: i % 11 !== 0,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log("✅ Products seeded (50 items)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
