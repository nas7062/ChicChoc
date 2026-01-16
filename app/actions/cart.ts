"use server";
import { authOptions } from "@/lib/auth";
import { addItemsToCart } from "@/lib/cart";
import { getServerSession } from "next-auth";
import { CartOptionItem } from "../components/BottomSheet";
import { NextResponse } from "next/server";

export async function addToCartAction(items: CartOptionItem[]) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return addItemsToCart(userId, items);
}
