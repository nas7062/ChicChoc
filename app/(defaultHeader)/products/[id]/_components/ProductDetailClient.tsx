"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Tabs, { TabKey } from "./Tabs";
import InfoSection from "./InfoSection";
import SizeSection from "./SizeSection";
import ReviewSection from "./ReviewSection";
import RecoSection from "./RecoSection";
import InquirySection from "./InquirySection";
import { Product } from "@/app/type";


export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedTab, setSelectedTab] = useState<TabKey>("info");

  return (
    <div className="flex flex-col gap-4">
      <Image
        src={product.imageUrl ?? "/bannerImage1.jpg"}
        alt={product.title}
        width={678}
        height={800}
        className="aspect-square rounded-lg"
      />

      <div className="flex flex-col gap-1 p-2">
        <p className="text-sm">{product.title}</p>

        <div className="flex gap-2">
          <Star className="text-gray-300 w-4 h-4" />
          <p className="text-xs">{product.rating}</p>
          <p className="text-xs">({product.reviewCount})</p>
        </div>

        <div className="flex gap-1 text-sm items-center">
          <p className="text-blue-400">{product.discountRate}%</p>
          <p className="line-through text-gray-500 text-xs">
            {product.price.toLocaleString()}원
          </p>
        </div>

        <p className="font-semibold text-blue-400">
          {Number((product.price * (1 - product.discountRate / 100)).toFixed(0)).toLocaleString()}원
        </p>
      </div>

      <div className="relative w-full">
        <Tabs selected={selectedTab} onChange={setSelectedTab} />

        <section className="mt-24">
          {selectedTab === "info" && <InfoSection image={product.imageUrl} />}
          {selectedTab === "size" && <SizeSection />}
          {selectedTab === "review" && <ReviewSection />}
          {selectedTab === "reco" && <RecoSection />}
          {selectedTab === "inquiry" && <InquirySection />}
        </section>
      </div>
    </div>
  );
}
