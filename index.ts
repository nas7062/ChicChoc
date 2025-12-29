import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Kim",
    },
  });

  console.log("created:", user);

  const users = await prisma.user.findMany();
  console.log("all users:", users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
