// app/order/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import OrderItem from "@/app/components/OrderItem";
import { Product } from "@/app/type";
import AddreesCard from "@/app/components/AddressCard";

interface Props {
  params: Promise<{ id: string }>;  // params를 Promise로 처리
}

export default async function OrderDetailPage({ params }: Props) {
  const session = await auth();  // 세션 가져오기

  // params.id는 URL에서 전달된 paymentId 값
  const { id: idParam } = await params;  // Promise에서 id를 가져옵니다.
  const paymentId = idParam;  // paymentId로 사용


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
  const deliveryFee = orderWithAddress && orderWithAddress?.amount > 100000 ? 0 : 3000;
  if (!orderWithAddress) {
    return <div>Order not found</div>;
  }
  console.log(orderWithAddress)
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-semibold text-xl">주문 상세</h2>
      <div className="flex gap-2">
        <p className="font-semibold">{orderWithAddress.createdAt?.toLocaleDateString('ko-KR')}결제</p>
        <p className="text-gray-500">(주문 ID: {orderWithAddress.paymentId})</p>
      </div>
      {/* 주문 상세 정보 출력 */}
      <div>
        {orderWithAddress.items.map((item) =>
          <OrderItem key={item.id}
            item={{ ...item, product: orderWithAddress.items.find((i) => i.productId === item.productId) as unknown as Product }} />)}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">배송지 정보</h2>
        <AddreesCard id={orderWithAddress.selectedAddress?.id} label={orderWithAddress.selectedAddress?.label ?? "배송지"}
          address={orderWithAddress.selectedAddress?.address ?? ''} phone={orderWithAddress.selectedAddress?.phone ?? ''}
          isDefault={orderWithAddress.selectedAddress?.isDefault ?? false}
        />
      </div>
      <div className="bg-gray-100 p-4 flex flex-col gap-2">
        <h2 className="font-semibold">결제 금액</h2>
        <div className="flex justify-between text-xs">
          <p>상품금액</p>
          <p>{Number(orderWithAddress.amount).toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-xs">
          <p>배송금액</p>
          <p>{Number(deliveryFee).toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>총 결제 금액</p>
          <p className="text-lg text-blue-400">{Number(orderWithAddress.amount + deliveryFee).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
