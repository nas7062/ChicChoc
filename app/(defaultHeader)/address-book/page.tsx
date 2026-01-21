import AddreesCard from "@/app/components/AddressCard";
import { Plus } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-xl">배송지 목록</h2>
      <button className=" cursor-pointer flex justify-center hover:bg-gray-100 transition-colors duration-300 items-center w-full p-2 border border-gray-200 shadow">
        <Plus />
        <p>새 배송지 추가</p>
      </button>
      <AddreesCard />
      <AddreesCard />
    </div>
  );
}