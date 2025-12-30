"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  Images: string[];
}

export function BannerCarousel({ Images }: Props) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-2xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Card className="border-none shadow-none p-0">
                <CardContent className="flex aspect-video items-center justify-center p-0">
                  <Image
                    src={image}
                    alt="배너 이미지"
                    priority
                    width={600}
                    height={300}
                    className=" rounded-2xl overflow-hidden"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
