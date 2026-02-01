// app/order/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";  // notFound import

interface Props {
  params: Promise<{ id: string }>;  // params를 Promise로 처리
}

export default async function OrderDetailPage({ params }: Props) {
  const session = await auth();  // 세션 가져오기

  // params.id는 URL에서 전달된 paymentId 값
  const { id: idParam } = await params;  // Promise에서 id를 가져옵니다.
  const paymentId = idParam;  // paymentId로 사용

  console.log("Order Payment ID:", paymentId);  // paymentId 값 확인

  // paymentId로 주문 조회
  const orderWithAddress = await prisma.order.findUnique({
    where: {
      paymentId: paymentId,  // paymentId로 주문 조회
    },
    include: {
      selectedAddress: true,  // 배송지 정보 포함
      items: true,            // 주문 항목들 포함
    },
  });

  if (!orderWithAddress) {
    return <div>Order not found</div>;
  }
  console.log(orderWithAddress)
  return (
    <div>
      <h1>Order Details</h1>
      <p>Payment ID: {orderWithAddress.paymentId}</p>
      {/* 주문 상세 정보 출력 */}
    </div>
  );
}
