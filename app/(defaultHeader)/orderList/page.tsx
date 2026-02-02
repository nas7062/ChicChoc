
import OrderItem from "@/app/components/OrderItem";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
import OrderDetailBtn from "./_components/orderDetailBtn";
import OrderSearchInput from "./_components/OrderSearchInput";

export default async function OrderListPage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {
  const session = await auth();
  const keyword = searchParams.keyword ?? "";
  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
      status: "PAID",
      ...(keyword && {
        items: {
          some: {
            product: {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          },
        },
      }),
    },
    orderBy: [{ createdAt: "desc" }],
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <OrderSearchInput />
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