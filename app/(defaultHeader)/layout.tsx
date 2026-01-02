"use client";
import Header from "@/app/components/Header";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DefaultHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const label =
    pathname === "/my"
      ? "마이페이지"
      : pathname === "/cart"
        ? "장바구니"
        : "";

  return (
    <div className="flex flex-col gap-4">
      <Header
        label={label}
        isMy={pathname === "/my"}
        isCart={pathname === "/cart"}
      />
      {children}
      <div className="group fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-200 p-2 rounded-full z-10 cursor-pointer group-hover:bg-gray-300 transition-colors duration-300 ">
        <Heart className="text-red-500 fill-red-500  group-hover:fill-red-600 " />
      </div>
    </div>
  );
}
