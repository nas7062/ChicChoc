import Category from "@/app/components/Category";
import { X } from "lucide-react";

export default function Page() {
  const recentSearch = ["최근 검색어 1", "최근 검색어 2", "최근 검색어 3"];
  const popularSearch = ["인기 검색어 1", "인기 검색어 2", "인기 검색어 3", "인기 검색어 4", "인기 검색어 5", "인기 검색어 6", "인기 검색어 7", "인기 검색어 8", "인기 검색어 9", "인기 검색어 10"];
  return <div className="flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <p className="font-semibold text-sm">최근 검색어</p>
      <p className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">전체삭제</p>
    </div>

    <div className="flex gap-1 ">
      {recentSearch.map((search) => (
        <div key={search} className="relative">
          <p key={search} className=" text-xs text-gray-500 border border-gray-300 rounded-xl pl-4 pr-6 py-1 hover:bg-gray-100 cursor-pointer">{search}</p>
          <X className="absolute right-1.5 top-[5px] w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-sm">당신을 위한 추천 카테고리</p>
      <Category />
    </div>
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-sm">인기 검색어</p>
      <div className="flex flex-col flex-wrap gap-1 w-full h-60">
        {popularSearch.map((search, idx) => (
          <div key={search} className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-md cursor-pointer w-1/2">
            <p className="text-xs text-gray-500 w-8 h-8 flex items-center justify-center rounded-md bg-gray-100">{idx + 1}</p>
            <p className="text-xs text-gray-500 text-nowrap">{search}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
}
