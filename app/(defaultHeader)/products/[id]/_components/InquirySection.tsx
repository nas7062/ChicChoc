import { Truck } from "lucide-react";

export default function InquirySection() {
  return (
    <div className="flex flex-col justify-center items-center gap-1 py-10">
      <div><Truck className="w-10 h-10" /></div>
      <p className="font-semibold">
        배송에 대해 궁금한 것이 있으신가요?
      </p>
      <p className="text-sm text-gray-500">
        상품 관련 문의는 판매자가 상세히 답변드립니다.
        상품 문의하기
      </p>
      <button className="bg-blue-400 px-4 py-1 text-white rounded-xl hover:bg-blue-500 cursor-pointer transition-colors duration-300">문의하기</button>
    </div>
  );
}