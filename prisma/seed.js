import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Categories 데이터 정의
export const Categories = [
  { name: "Hot", slug: "인기" },
  { name: "Top", slug: "상의" },
  { name: "Bottom", slug: "하의" },
  { name: "Quick", slug: "빠른배송" },
  { name: "Outer", slug: "아우터" },
  { name: "Beauty", slug: "뷰티" },
  { name: "Shoes", slug: "신발" },
  { name: "Bag", slug: "가방" },
];

async function main() {
  // 1) 카테고리 먼저 삽입
  const categories = await prisma.category.createMany({
    data: Categories,
    skipDuplicates: true, // 중복된 카테고리는 삽입하지 않음
  });

  console.log(`Successfully added ${categories.count} categories`);

  // 2) 카테고리 목록 가져오기
  const categoriesFromDb = await prisma.category.findMany();
  console.log("Categories fetched from DB:", categoriesFromDb.length);

  // 3) product 생성
  const products = Array.from({ length: 50 }).map((_, i) => {
    const category = categoriesFromDb[i % categoriesFromDb.length];
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
      categoryId: category.id,
    };
  });

  const result = await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
  console.log(`Created ${result.count} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
