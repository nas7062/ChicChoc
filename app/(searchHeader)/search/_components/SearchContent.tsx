"use client"

import Category from "@/app/components/Category";
import SearchList from "@/app/components/SearchList";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


export default function SearchContent() {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");

  const popularSearch = [
    "인기 검색어 1",
    "인기 검색어 2",
    "인기 검색어 3",
    "인기 검색어 4",
    "인기 검색어 5",
    "인기 검색어 6",
    "인기 검색어 7",
    "인기 검색어 8",
    "인기 검색어 9",
    "인기 검색어 10",
  ];
  const [recentKeywords, setRecentKeywords] = useState<string[]>(() => {

    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("recentKeywords") || "[]");
    } catch {
      return [];
    }
  });

  const saveRecentKeyword = (kw: string) => {
    const next = [kw, ...recentKeywords.filter((k) => k !== kw)].slice(0, 10);
    localStorage.setItem("recentKeywords", JSON.stringify(next));
    setRecentKeywords(next);
  };

  const removeRecentKeyword = (kw: string) => {
    const next = recentKeywords.filter((k) => k !== kw);
    localStorage.setItem("recentKeywords", JSON.stringify(next));
    setRecentKeywords(next);
  };

  const clearRecentKeywords = () => {
    localStorage.removeItem("recentKeywords");
    setRecentKeywords([]);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-sm">최근 검색어</p>
        <p className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer" onClick={clearRecentKeywords}>
          전체삭제
        </p>
      </div>

      <div className="flex gap-1 ">
        {recentKeywords.map((search: string) => (
          <div key={search} className="relative">
            <p
              key={search}
              className=" text-xs text-gray-500 border border-gray-300 rounded-xl pl-4 pr-6 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {search}
            </p>
            <X className="absolute right-1.5 top-[5px] w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" onClick={() => removeRecentKeyword(search)} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-sm">당신을 위한 추천 카테고리</p>
        <Category />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-sm">인기 검색어</p>
        <div className="flex flex-col flex-wrap gap-1 w-full h-52 ">
          {popularSearch.map((search, idx) => (
            <div
              key={search}
              className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-md cursor-pointer w-1/2"
            >
              <p className="text-xs text-gray-500 w-6 h-6 flex items-center justify-center rounded-md bg-gray-100">
                {idx + 1}
              </p>
              <p className="text-xs text-gray-500 text-nowrap">{search}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-sm"></p>
        <SearchList keyword={keyword} category={category} />
      </div>
    </div>
  );
}
