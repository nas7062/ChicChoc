"use client";
import Header from "@/app/components/Header";
import { Heart } from "lucide-react";
import Link from "next/link";
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

      default:
        return "";
    }
  }

  const label = getPageLabel(pathname);

  return (
    <div className="flex flex-col gap-4">
      <Header
        label={label}
        isMy={pathname === "/my"}
        isCart={pathname === "/cart"}
        noBtn={label === "로그인" || label === "회원가입" || pathname === "/auth/email-login"}
      />
      {children}
      <Link href="/like" className="group fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-200 p-2 rounded-full z-10 cursor-pointer group-hover:bg-gray-300 transition-colors duration-300 ">
        <Heart className="text-red-500 fill-red-500  group-hover:fill-red-600 " />
      </Link>
    </div>
  );
}
