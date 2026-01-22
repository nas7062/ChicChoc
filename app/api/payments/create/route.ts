import { ProductInCart } from "@/app/type";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { items } = await req.json();
  const { prisma } = await import("@/lib/prisma");
  const session = await auth();
  //  금액은 클라에서 받지 말고 서버에서 계산
  const amount = items.reduce((sum: number, it: ProductInCart) => sum + it.price * it.quantity, 0);


  const paymentId = `pay_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  // TODO: DB에 order 생성 
  const order = await prisma.order.create({
    data: {
      paymentId,  
      amount,
      orderName: items[0].title,
      currency: 'KRW',
      status: "PENDING",
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    },
  });

  return NextResponse.json({
    paymentId: order.paymentId,
    amount: order.amount,
    currency: order.currency
  });
}
