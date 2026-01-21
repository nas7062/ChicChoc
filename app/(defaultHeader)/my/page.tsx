"use client";
import RecentItemList from "@/app/components/RecentItemList";
import { BadgeRussianRuble, List, LogOut, SquareChartGantt, Truck } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const MyList = [
  { label: "주문 내역", icon: List, href: "/orders" },
  { label: "리뷰", icon: SquareChartGantt, href: "/reviews" },
  { label: "포인트", icon: BadgeRussianRuble, href: "/points" },
  { label: "배송지 관리", icon: Truck, href: "/address-book" },
  { label: "로그아웃", icon: LogOut, action: "logout" as const },
];
export default function MyPage() {
  const { data: session, status } = useSession();


  const router = useRouter();
  if (status === "loading") return null;

  const handleClick = async (item: (typeof MyList)[number]) => {
    if ("action" in item && item.action === "logout") {
      await signOut({ callbackUrl: "/auth/signin" });
      return;
    }

    if ("href" in item && item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 justify-center items-center w-full h-40">
        <p className="font-semibold">{session?.user.name}</p>
        <p className="text-xs text-gray-500">{session?.user.email}</p>
        <button onClick={() => router.push('/profile-editor')} className="text-white bg-blue-400 text-sm hover:bg-blue-500 px-4 py-1 rounded-2xl transition-colors duration-300 cursor-pointer">
          내 정보 수정
        </button>
      </div>

      <div className="w-full h-1 bg-gray-200" />

      <div className="flex flex-col ">
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
      <div className="w-full h-1 bg-gray-200" />
      <div className="py-2">
        <RecentItemList />
      </div>
    </div>
  );
}
