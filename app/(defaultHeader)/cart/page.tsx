
import { getCartAction } from "@/app/actions/cart";
import dynamic from "next/dynamic";
import CartListClient from "./_components/CartListClient";

const RecentItemListClientOnly = dynamic(
  () => import("@/app/components/RecentItemList"),
  { ssr: false }
);

export default async function CartPage() {

  const cartList = await getCartAction();
  const totalPrice = cartList.reduce((prev, item) => prev + item.price * item.quantity * 0.9, 0);
  const deliveryFee = totalPrice > 100000 ? 0 : 3000;
  if (cartList.length === 0)
    return (
      <div className="w-full">
        <div className="flex flex-col gap-2 justify-center items-center w-full h-40">
          <p className="font-semibold">장바구니에 담긴 상품이 없아요.</p>
          <p className="text-xs text-gray-500">원하는 상품을 담아봐요</p>
          <button className="text-white bg-blue-400 text-sm hover:bg-blue-500 px-4 py-1 rounded-2xl transition-colors duration-300 cursor-pointer">
            상품 보러 가기
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <RecentItemListClientOnly />
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
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
          <p className="text-lg text-blue-400">{Number(totalPrice - deliveryFee).toLocaleString()}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <RecentItemListClientOnly />
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
          {totalPrice.toLocaleString()}원 구매하기
        </button>
      </div>
    </div>
  );
}
