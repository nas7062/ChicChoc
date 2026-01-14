"use client";
import RecentItemList from "@/app/components/RecentItemList";
import { BadgeRussianRuble, List, LogOut, SquareChartGantt } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const MyList = [
  { label: "주문 내역", icon: List },
  { label: "리뷰", icon: SquareChartGantt },
  { label: "포인트", icon: BadgeRussianRuble },
  {
    label: "로그아웃",
    icon: LogOut,
    action: "logout",
  },
];

export default function MyPage() {
  const { data: session, status } = useSession();
  console.log(session)
  if (status === "loading") return null;

  const handleClick = async (item: (typeof MyList)[number]) => {
    if (item.action !== "logout") return;

    try {
      // 커스텀 JWT 쿠키 삭제
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // NextAuth 세션 종료
      await signOut({
        callbackUrl: "/auth/signin",
      });
    } catch (e) {
      console.error("logout failed", e);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 justify-center items-center w-full h-40">
        <p className="font-semibold">{session?.user.name}</p>
        <p className="text-xs text-gray-500">{session?.user.email}</p>
        <button className="text-white bg-blue-400 text-sm hover:bg-blue-500 px-4 py-1 rounded-2xl transition-colors duration-300 cursor-pointer">
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
              onClick={() => handleClick(list)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <Icon size={20} className="text-gray-700" />
              <p className="text-sm">{list.label}</p>
            </div>
          );
        })}
      </div>
      <RecentItemList />
    </div>
  );
}
