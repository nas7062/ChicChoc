"use client";
import { BadgeRussianRuble, List, SquareChartGantt } from "lucide-react";

const MyList = [
  { label: "주문 내역", icon: List },
  { label: "리뷰", icon: SquareChartGantt },
  { label: "포인트", icon: BadgeRussianRuble },
];

export default function MyPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 justify-center items-center w-full h-40">
        <p className="font-semibold">민석</p>
        <p className="text-xs text-gray-500">nas7062@naver.com</p>
        <button className="text-white bg-blue-400 text-sm hover:bg-blue-500 px-4 py-1 rounded-2xl transition-colors duration-300  cursor-pointer">
          내 정보 수정
        </button>
      </div>

      <div className="w-full h-1 bg-gray-200" />

      <div className="flex flex-col">
        {MyList.map((list) => {
          const Icon = list.icon;
          return (
            <div
              key={list.label}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <Icon size={20} className="text-gray-700" />
              <p className="text-sm">{list.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
