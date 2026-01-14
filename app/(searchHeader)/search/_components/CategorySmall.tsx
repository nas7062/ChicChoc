"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import { Categories } from "@/app/constant/index";
import { useRouter } from "next/navigation";


export function CategorySmall() {
  const router = useRouter();
  return (
    <Carousel className="w-full max-w-xl py-2">
      <CarouselContent className="ml-2 sm:ml-10">
        {Categories &&
          Categories.map((cate, index) => (
            <CarouselItem key={index + 1} className="pl-1  basis-1/7">
              <div className="p-1">
                <Card
                  className="rounded-full px-2 py-1 overflow-hidden cursor-pointer group hover:bg-gray-100 duration-300 transition-colors"
                  onClick={() => router.push(`/search?category=${index + 1}`)}
                >
                  <CardContent className="relative w-full h-full p-0 flex items-center justify-center">
                    <span className="group relative z-10 text-black/40 font-bold text-sm ">
                      {cate.label}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>

    </Carousel>
  );
}
