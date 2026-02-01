"use client"

import Image from "next/image";
import { Product } from "../type";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
interface OrderItem {
  id: string;
  orderId: string;
  productId: number;
  quantity: number;
  size: string;
  color: string;
  price: number;
  product: Product;
  createdAt: Date;
}
export type OrderItemWithProduct = OrderItem & {
  product: Product;
};
interface Props {
  item: OrderItemWithProduct
}

export default function OrderItem({ item }: Props) {
  return (
    <div className="flex flex-col gap-4 p-2 border border-gray-200 rounded-lg  ">
      <div className="flex justify-between">
      </div>
      <div className="flex gap-2">
        <Image src={"/bannerImage1.jpg"} alt="아이템" width={60} height={60} className="aspect-square rounded-md" />
        <div className="flex flex-col gap-1 relative flex-1">
          <p className="text-xs font-semibold">스파오</p>
          <p className="text-xs text-gray-500">[앨리스펑크PICK💖] 파스텔 푸퍼_SPJPF4TG01</p>
          <div className="flex justify-between">
            <p>상품 금액</p>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-blue-400">{Number(item.price * 0.9 * item.quantity).toLocaleString()}원</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 w-full flex justify-between px-2 py-1 items-center">
        <p className="text-xs">COLOR : {item.color} / SIZE : {item.size} </p>

      </div>

    </div>
  );
}