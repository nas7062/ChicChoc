import { CartOptionItem } from "@/app/components/BottomSheet";
import { prisma } from "@/lib/prisma";

export async function addItemsToCart(userId: string, items: CartOptionItem[]) {
  if (!userId) throw new Error("No userId");
  if (!items?.length) return { ok: true };

  return prisma.$transaction(async (tx) => {
    // 1) cart 없으면 생성 (userId unique)
    const cart = await tx.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
      select: { id: true },
    });

    // 2) 각 아이템을 옵션 단위로 upsert (있으면 quantity 증가)
    for (const it of items) {
      if (!it.size || !it.color || it.quantity <= 0) continue;

      await tx.cartItem.upsert({
        where: {
          cartId_productId_size_color: {
            cartId: cart.id,
            productId: it.productId,
            size: it.size,
            color: it.color,
          },
        },
        update: {
          quantity: { increment: it.quantity },
        },
        create: {
          cartId: cart.id,
          productId: it.productId,
          size: it.size,
          color: it.color,
          quantity: it.quantity,
        },
      });
    }

    return { ok: true, cartId: cart.id };
  });
}
