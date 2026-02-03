"use client";
import Header from "@/app/components/Header";
import { UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DefaultHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function getPageLabel(pathname: string) {
    switch (pathname) {
      case "/my":
        return "마이페이지";
      case "/cart":
        return "장바구니";
      case "/auth/signin":
        return "로그인";
      case "/auth/signup":
        return "회원가입"
      case "/like":
        return "찜 목록"
      default:
        return "";
    }
  }

  const label = getPageLabel(pathname);

  return (
    <div className="flex flex-col gap-4 relative">
      <Header
        label={label}
        isMy={pathname === "/my"}
        isCart={pathname === "/cart"}
        isLike={pathname === "/like"}
        noBtn={label === "로그인" || label === "회원가입" || pathname === "/auth/email-login"}
      />
      {children}
      <button className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-100 cursor-pointer">
        <UserRound className="h-10 w-10" />
      </button>
    </div>
  );
}
