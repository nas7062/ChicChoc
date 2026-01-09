import { createClient } from "@/lib/supabase/server";
import { Item } from "./Item";

export default async function ItemList() {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("Product")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">당신을 위한 추천 아이템</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {items?.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}