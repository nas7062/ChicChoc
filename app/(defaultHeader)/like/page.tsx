export const dynamic = "force-dynamic";

import ItemList from "@/app/components/ItemList";

export default function LikePage() {
  return (
    <div>
      <p className="text-sm text-gray-500">찜한 아이템</p>
      <ItemList />
    </div>
  )
}