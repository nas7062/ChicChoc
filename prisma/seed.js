import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Category 생성
  const categories = await prisma.category.findMany();

  // 2️⃣ Product 생성
  const products = Array.from({ length: 50 }).map((_, i) => {
    const category = categories[i % categories.length];

    return {
      title: `샘플 상품 ${i + 1}`,
      slug: `sample-product-${i + 1}`,
      brand: [
        "NIKE",
        "ADIDAS",
        "APPLE",
        "DYSON",
        "DIVEIN",
        "DRAWFIT",
        "YAMMY",
        "HOOVES",
      ][i % 8],
      imageUrl: `https://picsum.photos/seed/product-${i + 1}/600/600`,
      price: 50000 + i * 1000,
      discountRate: (i % 5) * 5,
      rating: 4 + (i % 10) * 0.1,
      reviewCount: 10 + i * 3,
      stock: i % 7 === 0 ? 0 : 20,
      isActive: i % 11 !== 0,
      categoryId: category.id, // 🔑 실제 UUID
    };
  });

  await prisma.product.createMany({ data: products });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
