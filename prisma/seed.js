import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Category 생성
  const categories = await prisma.category.createMany({
    data: [
      { id: 1, slug: "신발", name: "Hot" },
      { id: 2, slug: "상의", name: "Top" },
      { id: 3, slug: "바지", name: "Bottom" },
      { id: 4, slug: "빠른배송", name: "Quick" },
      { id: 5, slug: "아우터", name: "Outer" },
      { id: 6, slug: "화장품", name: "Beauty" },
      { id: 7, slug: "신발", name: "Shoes" },
      { id: 8, slug: "가방", name: "Bag" },
    ],
    skipDuplicates: true,
  });

 

  // 2️⃣ Product 50개 생성
  const products = Array.from({ length: 50 }).map((_, i) => {
    const categoryId = (i % 8) + 1;

    return {
      title: `샘플 상품 ${i + 1}`,
      slug: `sample-product-${i + 1}`,
      brand: ["NIKE", "ADIDAS", "APPLE", "DYSON","DIVEIN","DRAWFIT","YAMMY","HOOVES"][i % 8],
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

 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
