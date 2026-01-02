"use client"
import Header from "@/app/components/Header";
import { usePathname } from "next/navigation";

export default function DefaultHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let label = ''
  if (pathname === '/my') {
    label = '마이페이지'
  }
  return (
    <div className="flex flex-col gap-4">
      <Header label={label} />
      {children}
    </div>
  );
}
