"use client"

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { ProductInCart } from "../type";

interface Props {
  item: ProductInCart,
  onChangeCount: (next: number) => void;
  onRemove: () => void;
}

export default function CartViewItem({ item, onChangeCount, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex gap-2">
        <Image src={"/bannerImage1.jpg"} alt="아이템" width={60} height={60} className="aspect-square rounded-md" />
        <div className="flex flex-col gap-1 relative flex-1">
          <p className="text-xs font-semibold">스파오</p>
          <p className="text-xs text-gray-500">[앨리스펑크PICK💖] 파스텔 푸퍼_SPJPF4TG01</p>
          <div className="flex gap-1">
            <button onClick={() => onChangeCount(Math.max(1, item.quantity - 1))} className="cursor-pointer"><Minus /></button>
            <p className="border py-1 px-3 border-gray-200 rounded-md">{item.quantity}</p>
            <button onClick={() => onChangeCount(item.quantity + 1)} className="cursor-pointer"><Plus /></button>
          </div>
          <button onClick={onRemove} className="absolute right-2 top-1 cursor-pointer"><X className="text-gray-400 w-4 h-4" /></button>
        </div>
      </div>
      <div className="bg-gray-200 w-full flex justify-between px-2 py-1 items-center">
        <p className="text-xs">COLOR : {item.color} / SIZE : {item.size} </p>
        <button className="bg-white px-2 py-1 text-xs rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-300">옵션 변경</button>
      </div>
      <div className="flex justify-between">
        <p>상품 금액</p>
        <div className="flex gap-2 items-center">
          <p className="line-through text-gray-500 text-xs">{Number(item.price * item.quantity).toLocaleString()}원</p>
          <p className="font-semibold text-blue-400">{Number(item.price * 0.9 * item.quantity).toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
}