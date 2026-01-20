"use server";
import { addItemsToCart } from "@/lib/cart";
import { CartOptionItem } from "../components/BottomSheet";
import { NextResponse } from "next/server";
import { ProductInCart } from "../type";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function addToCartAction(items: CartOptionItem[]) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return addItemsToCart(userId, items);
}

export async function getCartAction(): Promise<ProductInCart[]> {
  const { prisma } = await import("@/lib/prisma");
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return [];

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });

  return (
    cart?.items.map((it) => ({
      cartItemId: it.id,
      productId: it.productId,
      title: it.product.title,
      imageUrl: it.product.imageUrl,
      price: it.product.price,
      discountRate: it.product.discountRate,
      brand: it.product.brand,
      size: it.size,
      color: it.color,
      quantity: it.quantity,
    })) ?? []
  );
}

export async function updateCartItemQtyAction(
  cartItemId: string,
  quantity: number
) {
  const { prisma } = await import("@/lib/prisma");

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");
  if (quantity < 1) throw new Error("Quantity must be >= 1");

  // 내 카트 아이템 맞는지 체크 + 업데이트 (보안상 중요)
  await prisma.cartItem.updateMany({
    where: { id: cartItemId, cart: { userId } },
    data: { quantity },
  });

  revalidatePath("/cart");
}

export async function removeCartItemAction(cartItemId: string) {
  const { prisma } = await import("@/lib/prisma");

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("Unauthorized");

  await prisma.cartItem.deleteMany({
    where: { id: cartItemId, cart: { userId } },
  });

  revalidatePath("/cart");
}
