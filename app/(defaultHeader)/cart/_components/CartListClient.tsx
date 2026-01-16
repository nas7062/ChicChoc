"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ProductInCart } from "@/app/type";
import CartViewItem from "@/app/components/CartViewItem";
import { removeCartItemAction, updateCartItemQtyAction } from "@/app/actions/cart";

export default function CartListClient({ initialItems }: { initialItems: ProductInCart[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  const [items, setOptimistic] = useOptimistic(
    initialItems,
    (prev: ProductInCart[], action:
      | { type: "remove"; cartItemId: string }
      | { type: "qty"; cartItemId: string; quantity: number }
    ) => {
      if (action.type === "remove") {
        return prev.filter((it) => it.cartItemId !== action.cartItemId);
      }
      return prev.map((it) =>
        it.cartItemId === action.cartItemId ? { ...it, quantity: action.quantity } : it
      );
    }
  );

  const onRemove = (cartItemId: string) => {
    setOptimistic({ type: "remove", cartItemId });

    startTransition(async () => {
      try {
        await removeCartItemAction(cartItemId);
        router.refresh(); // 서버 컴포넌트 재요청해서 싱크 맞추기
      } catch (e) {
        router.refresh(); // 실패 시 원복(서버가 진실)
      }
    });
  };

  const onChangeCount = (cartItemId: string, nextQty: number) => {
    if (nextQty < 1) return;
    setOptimistic({ type: "qty", cartItemId, quantity: nextQty });

    startTransition(async () => {
      try {
        await updateCartItemQtyAction(cartItemId, nextQty);
        router.refresh();
      } catch (e) {
        router.refresh();
      }
    });
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col gap-2">
      {items.map((item) => (
        <CartViewItem
          key={item.cartItemId}
          item={item}
          onRemove={() => onRemove(item.cartItemId!)}
          onChangeCount={(next) => onChangeCount(item.cartItemId!, next)}
        />
      ))}
    </div>
  );
}
