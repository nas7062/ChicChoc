"use client";
import { useEffect, useState } from "react";
import { Product } from "../type";
import { Item } from "./Item";
import { RECENT_KEY } from "../constant";




export default function RecentItemList() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  if (items.length === 0) return <div className="text-sm text-gray-500">최근 본 상품이 없어요</div>;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">최근 본 상품</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
