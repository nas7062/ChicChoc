import { Item } from "@/app/components/Item";

export default function RecoSection() {
  return <div className="flex flex-col gap-2">
    <p className="font-semibold text-sm">추천 상품</p>
    <div className="grid grid-cols-3">
      <Item />
      <Item />
      <Item />
    </div>
  </div>
}