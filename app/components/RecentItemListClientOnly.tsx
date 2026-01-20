"use client";

import dynamic from "next/dynamic";

const RecentItemList = dynamic(
  () => import("@/app/components/RecentItemList"),
  { ssr: false }
);

export default function RecentItemListClientOnly() {
  return <RecentItemList />;
}
