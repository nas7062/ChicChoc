
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const res = await fetch(`https://api.portone.io/payments/${encodeURIComponent(paymentId)}`, {
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET!}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ message: "portone fetch failed", detail: text }, { status: 502 });
    }

    const payment = await res.json();

    const expectedStoreId = process.env.PORTONE_STORE_ID!;
    if (payment.storeId !== expectedStoreId) {
      return NextResponse.json({ message: "storeId mismatch" }, { status: 400 });
    }

    //DB 주문을 PAID로 변경
    await prisma.order.update({ where: { paymentId }, data: { status: "PAID" } })

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "verify failed" }, { status: 500 });
  }
}
