"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Product } from "../type";
import { Item } from "./Item";
import { RECENT_KEY } from "../constant";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

function readRecent(storageKey: string): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Product[]) : [];
  } catch {
    return [];
  }
}

export default function RecentItemList() {
  const { data: session } = useSession();

  const storageKey = useMemo(() => {
    return session?.user?.id
      ? `${RECENT_KEY}:${session.user.id}`
      : `${RECENT_KEY}:guest`;
  }, [session?.user?.id]);

  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    setItems(readRecent(storageKey));
  }, [storageKey]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        setItems(readRecent(storageKey));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  if (items.length === 0)
    return <div className="text-sm text-gray-500">최근 본 상품이 없어요</div>;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">최근 본 상품</p>
      <Carousel className="w-full py-2">
        <CarouselContent className="ml-1 basis-1/3 flex gap-1">
          {items.map((item) => (
            <CarouselItem className="basis-1/3 pl-1" key={item.id}>
              <Item item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
