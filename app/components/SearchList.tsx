"use client";

import { Product } from "../type";
import { Item } from "./Item";
import { useEffect, useState } from "react";

export default function SearchList({
  keyword,
  category,
}: {
  keyword: string | null;
  category: string | null;
}) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (keyword) params.set("keyword", keyword);
    if (category) params.set("category", category);

    fetch(`/api/products/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  }, [keyword, category]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
