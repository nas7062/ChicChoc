

import Image from "next/image";

export default function CartItem() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Image src={"/bannerImage1.jpg"} alt="아이템" width={60} height={60} className="aspect-square rounded-md" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">스파오</p>
          <p className="text-xs text-gray-500">[앨리스펑크PICK💖] 파스텔 푸퍼_SPJPF4TG01</p>
        </div>
      </div>
      <div className="bg-gray-200 w-full flex justify-between px-2 py-1 items-center">
        <p className="text-xs">COLOR / SIZE / 1개</p>
        <button className="bg-white px-2 py-1 text-xs rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-300">옵션 변경</button>
      </div>
      <div className="flex justify-between">
        <p>상품 금액</p>
        <div className="flex gap-2 items-center">
          <p className="line-through text-gray-500 text-xs">{Number(70000).toLocaleString()}</p>
          <p className="font-semibold text-blue-400">{Number(63000).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}