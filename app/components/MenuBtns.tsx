import { Search, ShoppingCart, UserRound } from "lucide-react";

export default function MenuBtns() {
  const btnCss = `hover:bg-slate-100 p-1.5 rounded-lg cursor-pointer transition-color duration-250`;
  return (
    <div className="flex gap-4">
      <button className={btnCss} aria-label="검색 버튼">
        <Search size={25} />
      </button>
      <button className={btnCss} aria-label="카트 버튼">
        <ShoppingCart size={25} />
      </button>
      <button className={btnCss} aria-label="내 정보 버튼">
        <UserRound size={25} />
      </button>
    </div>
  );
}
