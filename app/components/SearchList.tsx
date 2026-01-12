"use client";

import { useEffect, useState } from "react";
import { Product } from "../type";
import { Item } from "./Item";

export default function SearchList({ keyword, category }: { keyword: string | null, category: string | null }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (!keyword && !category) return;

    fetch(
      `/api/products/search?keyword=${keyword ?? ""}&category=${category ?? ""}`
    )
      .then(res => res.json())
      .then(data => setItems(data.items))
      .catch(console.error);
  }, [keyword, category]);

  return (
    <div>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
