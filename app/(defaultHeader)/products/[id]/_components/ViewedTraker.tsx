"use client";

import { RECENT_KEY } from "@/app/constant";
import { Product } from "@/app/type";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";


const MAX = 20;

export default function ViewedTracker({ product }: { product: Product }) {
  const { data: session } = useSession();
  const storageKey = useMemo(() => {
    return session?.user?.id
      ? `${RECENT_KEY}:${session.user.id}`
      : `${RECENT_KEY}:guest`;
  }, [session?.user?.id]);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const list: Product[] = Array.isArray(saved) ? saved : [];

      const next: Product[] = [
        { ...product, viewedAt: Date.now() },
        ...list.filter((p) => p.id !== product.id),
      ].slice(0, MAX);

      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  }, [product.id, storageKey]);

  return null;
}
