"use client";

import { useState } from "react";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Tabs, { TabKey } from "./Tabs";
import InfoSection from "./InfoSection";
import SizeSection from "./SizeSection";
import ReviewSection from "./ReviewSection";
import RecoSection from "./RecoSection";
import InquirySection from "./InquirySection";
import { Product } from "@/app/type";
import ViewedTracker from "./ViewedTraker";
import BottomSheet from "@/app/components/BottomSheet";


export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedTab, setSelectedTab] = useState<TabKey>("info");
  const [liked, setLiked] = useState(product.liked ?? false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const res = await fetch(`/api/products/${product.id}/like`, {
      method: "POST",
    });

    if (res.status === 401) {
      alert("로그인이 필요합니다");
      return;
    }

    const data = await res.json();
    setLiked(data.liked);

  };

  const handleBuy = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false); // 모달 닫기
  };
  return (
    <div className="flex flex-col gap-4 relative  ">
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
      <div className="flex fixed bottom-0   max-w-[640px]  w-full bg-gray-50 rounded-sm border border-gray-100 shadow  gap-1 sm:gap-4 px-4 sm:px-0">
        <div className="flex flex-col gap-1 justify-center  p-1 cursor-pointer">
          <p className="mx-auto text-xs">리뷰</p>
          <div className="flex items-center justify-center gap-1">
            <p className="text-xs">{product.rating}</p>
            <p className="text-xs">({product.reviewCount})</p>
          </div>
        </div>
        <button type="button" onClick={toggleLike}>
          <Heart className={`w-6 h-6 cursor-pointer ${liked ? "text-red-500  fill-red-500" : "text-gray-300 fill-gray-300"}`} />
        </button>
        <button onClick={handleBuy} className="flex-1 bg-blue-400 hover:bg-blue-500 px-2 text-white rounded-md cursor-pointer transition-colors duration-300">구매하기</button>
      </div>
      {isOpen && <BottomSheet isOpen={isOpen} onClose={handleClose} />}
      <ViewedTracker product={product} />
    </div>
  );
}
