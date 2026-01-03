"use client"
import { Star } from "lucide-react";
import Image from "next/image";
import Tabs, { TabKey } from "./_components/Tabs";
import { useState } from "react";
import InfoSection from "./_components/InfoSection";
import SizeSection from "./_components/SizeSection";
import ReviewSection from "./_components/ReviewSection";
import RecoSection from "./_components/RecoSection";
import InquirySection from "./_components/InquirySection";

export default function ProductDetailPage() {
  const [selectedTab, setSelectedTab] = useState<TabKey>("info");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Image src={"/bannerImage1.jpg"} alt="이미지" width={678} height={800} className="aspect-square rounded-lg" />
      </div>
      <div className="flex flex-col gap-1 p-2">
        <p className="text-sm">[MADE/숏,롱]사심 리뉴얼 투웨이 양기모 조거 트레이닝팬츠</p>
        <div className="flex gap-2">
          <Star className="text-gray-300 w-4 h-4" />
          <p className="text-xs">4.8</p>
          <p className="text-xs">(10012)</p>
        </div>
        <div className="flex gap-1 text-sm items-center">
          <p className="text-blue-400">10%</p>
          <p className="line-through text-gray-500 text-xs">{Number(70000).toLocaleString()}</p>
        </div>
        <p className="font-semibold text-blue-400">{Number(63000).toLocaleString()}</p>
      </div>
      <div className="relative w-full">
        <Tabs selected={selectedTab} onChange={setSelectedTab} />
        <section className="mt-24">
          {selectedTab === "info" && <InfoSection />}
          {selectedTab === "size" && <SizeSection />}
          {selectedTab === "review" && <ReviewSection />}
          {selectedTab === "reco" && <RecoSection />}
          {selectedTab === "inquiry" && <InquirySection />}
        </section>
      </div>
    </div>
  );
}