
import { getCartAction } from "@/app/actions/cart";
import CartListClient from "../cart/_components/CartListClient";
import AddreesCard from "@/app/components/AddressCard";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";


export default async function OrderPage() {
  const session = await auth();
  const cartList = await getCartAction();
  const totalPrice = cartList.reduce((prev, item) => prev + item.price * item.quantity * 0.9, 0);
  const deliveryFee = totalPrice > 100000 ? 0 : 3000;
  const addresses = await prisma.address.findMany({
    where: { userId: session?.user.id, isDefault: true },
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>배송지</p>
          <p>배송지 변경</p>
        </div>
        <AddreesCard key={addresses[0].id}
          id={addresses[0].id}
          label={addresses[0].label ?? "배송지"}
          address={addresses[0].address}
          phone={addresses[0].phone ?? ""}
          isDefault={addresses[0].isDefault} />
      </div>
      <div className="bg-gray-100 p-4 flex flex-col gap-2">
        <CartListClient initialItems={cartList} />
      </div>
      <div className="bg-gray-100 p-4 flex flex-col gap-2">
        <p className="font-semibold">결제 예상 금액</p>
        <div className="flex justify-between text-xs">
          <p>상품금액</p>
          <p>{Number(totalPrice).toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-xs">
          <p>배송금액</p>
          <p>{Number(deliveryFee).toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>총 결제 금액</p>
          <p className="text-lg text-blue-400">{Number(totalPrice + deliveryFee).toLocaleString()}</p>
        </div>
      </div>
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50">
        <button
          className="
      w-full max-w-xl
      py-2 rounded-2xl
      bg-blue-400 text-white
      hover:bg-blue-500
      transition-colors duration-300
      cursor-pointer
    "
        >
          {Number(totalPrice + deliveryFee).toLocaleString()}원 구매하기
        </button>
      </div>
    </div>
  )
}