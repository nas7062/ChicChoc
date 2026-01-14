"use client";
import { useEffect, useState } from "react";
import { Product } from "../type";
import { Item } from "./Item";
import { RECENT_KEY } from "../constant";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";



function loadRecent(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
export default function RecentItemList() {
  const [items] = useState<Product[]>(loadRecent);

  if (items.length === 0) return <div className="text-sm text-gray-500">최근 본 상품이 없어요</div>;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">최근 본 상품</p>
      <Carousel className="w-full  py-2">
        <CarouselContent className="ml-1 basis-1/3 flex gap-1">
          {items.map(item => (
            <CarouselItem className="basis-1/3 pl-1" key={item.id}>
              <Item key={item.id} item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div >
  );
}
