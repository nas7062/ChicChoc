"use client";

import { Search } from "lucide-react";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const onSubmit = () => {
    if (!inputRef.current) return;

    if (!inputRef.current.value.trim()) {
      inputRef.current.removeAttribute("name");
    }
  };

  return (
    <form
      action="/search"
      method="GET"
      className="relative"
      onSubmit={onSubmit}
    >
      {category && (
        <input type="hidden" name="category" value={category} />
      )}

      <input
        ref={inputRef}
        type="search"
        name="keyword"
        placeholder="검색어를 입력하세요"
        className="border border-gray-300 rounded-xl w-full h-8 pl-10 pr-4 text-sm"
      />

      <Search className="absolute left-2 top-1.5 text-gray-500" size={20} />
    </form>
  );
}
