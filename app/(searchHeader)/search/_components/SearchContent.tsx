"use client"

import Category from "@/app/components/Category";
import SearchList from "@/app/components/SearchList";
import { ISearchKeyword } from "@/app/type";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CategorySmall } from "./CategorySmall";


export default function SearchContent({ popularSearch }: { popularSearch: ISearchKeyword[] }) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const [mounted, setMounted] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState<string[]>(() => {

    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("recentKeywords") || "[]");
    } catch {
      return [];
    }
  });

  const saveRecentKeyword = useCallback((kw: string) => {
    setRecentKeywords(prev => {
      const next = [kw, ...prev.filter(k => k !== kw)].slice(0, 10);
      localStorage.setItem("recentKeywords", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeRecentKeyword = (kw: string) => {
    const next = recentKeywords.filter((k) => k !== kw);
    localStorage.setItem("recentKeywords", JSON.stringify(next));
    setRecentKeywords(next);
  };

  const clearRecentKeywords = () => {
    localStorage.removeItem("recentKeywords");
    setRecentKeywords([]);
  };
  const isSearch = Boolean(keyword || category);

  useEffect(() => {
    if (!keyword) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    saveRecentKeyword(keyword);
  }, [keyword, saveRecentKeyword]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (isSearch) return (
    <div className="flex flex-col gap-2">
      <CategorySmall />
      <SearchList keyword={keyword} category={category} />
    </div>
  )

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
              onClick={() => router.push(`/search?keyword=${search}`)}
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
              key={search.id}
              className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-md cursor-pointer w-1/2"
              onClick={() => router.push(`/search?keyword=${search}`)}
            >
              <p className="text-xs text-gray-500 w-6 h-6 flex items-center justify-center rounded-md bg-gray-100">
                {idx + 1}
              </p>
              <p className="text-xs text-gray-500 text-nowrap">{search.keyword}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
