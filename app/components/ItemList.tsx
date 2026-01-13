
import { Product } from "../type";
import { Item } from "./Item";

export default function ItemList({ items }: { items: Product[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">당신을 위한 추천 아이템</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}