
import { getCartAction } from "@/app/actions/cart";
import CartListClient from "../cart/_components/CartListClient";
import AddreesCard from "@/app/components/AddressCard";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import CheckoutButton from "@/app/components/CheckOutButton";


export default async function OrderPage() {
  const session = await auth();
  const cartList = await getCartAction();
  const totalPrice = cartList.reduce((prev, item) => prev + item.price * item.quantity * 0.9, 0);
  const deliveryFee = totalPrice > 100000 ? 0 : 3000;
  const defaultAddress = await prisma.address.findFirst({
    where: { userId: session!.user!.id, isDefault: true },
    orderBy: { updatedAt: "desc" },
  });


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>배송지</p>
          <Link href={'/address-book'}>배송지 변경</Link>
        </div>
        {defaultAddress ? (
          <AddreesCard
            id={defaultAddress.id}
            label={defaultAddress.label ?? "배송지"}
            address={defaultAddress.address}
            phone={defaultAddress.phone ?? ""}
            isDefault={defaultAddress.isDefault}
          />
        ) : (
          <div className="rounded-xl bg-gray-50 p-8 text-sm text-center text-gray-500">
            기본 배송지가 없습니다. 배송지를 추가해주세요.
          </div>
        )}
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
        <CheckoutButton cartList={cartList}
        >
          {Number(totalPrice + deliveryFee).toLocaleString()}원 구매하기
        </CheckoutButton>
      </div>
    </div>
  )
}