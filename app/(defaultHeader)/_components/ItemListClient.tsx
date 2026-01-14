"use client";

import ItemList from "@/app/components/ItemList";
import { Product } from "@/app/type";
import { useEffect, useState } from "react";


export default function ItemListClient() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items ?? []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  return <ItemList items={items} />;
}
