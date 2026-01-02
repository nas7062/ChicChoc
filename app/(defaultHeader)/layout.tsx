"use client";
import Header from "@/app/components/Header";
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
    </div>
  );
}
