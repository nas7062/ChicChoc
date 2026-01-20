import {  ProductInCart } from "@/app/type";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { items } = await req.json();
  const { prisma } = await import("@/lib/prisma");
  const session = await getServerSession(authOptions);
  //  금액은 클라에서 받지 말고 서버에서 계산(가격표/DB 기준)
  const amount = items.reduce((sum: number, it: ProductInCart) => sum + it.price * it.quantity, 0);

  // ✅ 결제 ID(paymentId)는 "주문번호"처럼 유니크하게
  const paymentId = `pay_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  // TODO: DB에 order 생성 (status: "PENDING", paymentId, amount ...)
  const order = await prisma.order.create({
    data: {
      paymentId,
      amount,
      orderName: items[0].title,
      status: "PENDING",
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    },
  });

  return NextResponse.json({  paymentId: order.paymentId,
    amount: order.amount, });
}
