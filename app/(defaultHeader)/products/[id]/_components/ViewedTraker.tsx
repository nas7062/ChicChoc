"use client";

import { RECENT_KEY } from "@/app/constant";
import { Product } from "@/app/type";
import { useEffect } from "react";


const MAX = 20;

export default function ViewedTracker({ product }: { product: Product }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      const list: Product[] = raw ? JSON.parse(raw) : [];

      // 기존에 있으면 제거하고 맨 앞으로
      const next = [
        { ...product, viewedAt: Date.now() },
        ...list.filter((p) => p.id !== product.id),
      ].slice(0, MAX);

      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  }, [product.id]);

  return null;
}
