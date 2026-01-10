import { Product } from "../type";
import { Item } from "./Item";

export default async function ItemList() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "force-cache",
  });

  const { items } = await res.json();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">당신을 위한 추천 아이템</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {items?.map((item: Product) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
