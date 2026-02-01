"use client"
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderDetailBtn({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  return (
    <button className="flex items-center cursor-pointer" onClick={() => router.push(`/order/${paymentId}`)}>
      <p className="text-sm">주문상세 </p>
      <ChevronRight className="text-gray-500" />
    </button>
  );
}