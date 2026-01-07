"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Category } from "@/app/constant/index";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {
  category: Category[];
}

export function CategorySlider({ category }: Props) {
  const router = useRouter();
  return (
    <Carousel className="w-full max-w-xl py-4">
      <CarouselContent className="ml-2 sm:ml-10">
        {category &&
          category.map((cate, index) => (
            <CarouselItem key={index} className="pl-1  basis-1/4">
              <div className="p-1">
                <Card className="w-20 h-20 rounded-full p-0 overflow-hidden cursor-pointer group" onClick={() => router.push(`/search?category=${cate.label}`)}>
                  <CardContent className="relative w-full h-full p-0 flex items-center justify-center">
                    <Image
                      src={cate.image ?? "/logo.jpg"}
                      alt={cate.label}
                      fill
                      className="object-cover scale-y-115 scale-x-150 group-hover:scale-160 transition-transform duration-250"
                      sizes="80px"
                      priority
                    />
                    <span className="group relative z-10 text-black/40 font-bold text-xl ">
                      {cate.label}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:block sm:-left-1" />
      <CarouselNext className="hidden sm:block sm:-right-8" />
    </Carousel>
  );
}
