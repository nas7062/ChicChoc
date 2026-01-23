
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const order = await prisma.order.findUnique({ where: { paymentId } });
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }

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

    // 트랜잭션으로 주문확정  카트삭제 같이
    await prisma.$transaction(async (tx) => {
      //  장바구니 아이템 가져오기
      const cartItems = order.userId
        ? await tx.cartItem.findMany({
          where: {
            cart: { userId: order.userId },
          },
          include: {
            product: true,
          },
        })
        : [];

      if (cartItems.length === 0) {
        throw new Error("cart is empty");
      }

      //  OrderItem 생성 
      await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: order.id,
          productId: item.productId,

          quantity: item.quantity,
          size: item.size,
          color: item.color,

          price: item.product.price, // 주문 당시 가격 스냅샷
        })),
      });

      // 주문 상태 확정
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
        },
      });

      //  장바구니 삭제
      await tx.cartItem.deleteMany({
        where: {
          cart: { userId: order.userId ?? undefined },
        },
      });

      await tx.cart.deleteMany({
        where: { userId: order.userId ?? undefined },
      });
    });


    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "verify failed" }, { status: 500 });
  }
}
