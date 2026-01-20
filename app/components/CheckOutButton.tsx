"use client";

import * as PortOne from "@portone/browser-sdk/v2";

export default function CheckoutButton() {
  const onPay = async () => {
    // 1) 서버에 주문 생성 요청
    const created = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ price: 19900, qty: 1 }],
      }),
    }).then((r) => r.json());

    const { paymentId, amount, currency } = created;

    // 2) 결제창 호출
    const res = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
      paymentId,
      orderName: "샘플 주문",
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

    if (verify.ok) alert("결제 완료(서버 검증 OK)!");
    else alert("결제는 진행됐지만 서버 검증 실패(주문 확정 보류)");
  };

  return <button onClick={onPay}>결제하기</button>;
}
