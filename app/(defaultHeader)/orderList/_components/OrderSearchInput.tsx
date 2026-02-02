"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function OrderSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (keyword) params.set("keyword", keyword);
    else params.delete("keyword");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="구매한 상품을 검색해보세요"
        onChange={onChange}
        className="border border-gray-300 rounded-xl w-full h-8 pl-10 pr-4 text-sm"
      />
      <Search className="absolute left-2 top-1.5 text-gray-500" size={20} />
    </div>
  );
}
