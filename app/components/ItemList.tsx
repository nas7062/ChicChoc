import { Item } from "./Item";

export default function ItemList() {
  return (
    <div className="grid grid-cols-3 gap-1">
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
}
