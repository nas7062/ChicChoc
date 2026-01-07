/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const res = await fetch("https://dummyjson.com/products?limit=50");
  const { products } = await res.json();

  await prisma.product.createMany({
    data: products.map((p) => ({
      brand: "Dummy",
      title: p.title,
      imageUrl: p.thumbnail,
      price: p.price * 1300,
      discountRate: Math.round(p.discountPercentage),
      rating: p.rating,
      reviewCount: Math.floor(Math.random() * 10000),
    })),
    skipDuplicates: true,
  });

  console.log("✅ Products seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
