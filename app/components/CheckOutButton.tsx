"use client";

import * as PortOne from "@portone/browser-sdk/v2";
import { ReactNode } from "react";
import { ProductInCart } from "../type";
import { redirect } from "next/navigation";
interface props {
  children?: ReactNode;
  cartList?: ProductInCart[]
}
export default function CheckoutButton({ children, cartList }: props) {
  const onPay = async () => {
    // 1) 서버에 주문 생성 요청
    const created = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartList
      }),
    }).then((r) => r.json());

    const { paymentId, amount, currency } = created;

    const res = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
      paymentId,
      orderName: "결제 목록",
      totalAmount: amount,
      currency,
      channelKey: process.env.NEXT_PUBLIC_CANNEL_ID,
      payMethod: "EASY_PAY",
    });

    // 3) 프론트 성공/실패 분기
    if (res?.code) {
      alert(`결제 실패: ${res.message ?? res.code}`);
      return;
    }

    // 4) 서버 검증(중요)
    const verify = await fetch("/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId }),
    });

    if (verify.ok) {
      alert("결제 완료!");
      redirect(`/order/${paymentId}`);
    }
    else alert("결제는 진행됐지만 서버 검증 실패");
  };

  return <button className="
  w-full max-w-xl
  py-2 rounded-2xl
  bg-blue-400 text-white
  hover:bg-blue-500
  transition-colors duration-300
  cursor-pointer
" onClick={onPay}>{children}</button>;
}
