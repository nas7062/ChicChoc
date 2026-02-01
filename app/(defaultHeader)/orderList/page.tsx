
import OrderItem from "@/app/components/OrderItem";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
import OrderDetailBtn from "./_components/orderDetailBtn";

export default async function OrderListPage() {
  const session = await auth();

  const orders = await prisma.order.findMany({
    where: { userId: session?.user.id, status: 'PAID' },
    orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  console.log(orders)
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="search"
          name="keyword"
          placeholder="구매한 상품을 검색해보세요"
          className="border border-gray-300 rounded-xl w-full h-8 pl-10 pr-4 text-sm" />
        <Search className="absolute left-2 top-1.5 text-gray-500" size={20} />
      </div>
      <div>
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col border gap-2 border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between">
                <p className="font-semibold">{order.createdAt.toLocaleDateString('ko-KR')}</p>
                <OrderDetailBtn paymentId={order.paymentId} />
              </div>
              {order.items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}