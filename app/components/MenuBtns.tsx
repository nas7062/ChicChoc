import { Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";

interface menuProps {
  isSearch?: boolean;
  isMy?: boolean
  isCart?: boolean;
}

export default function MenuBtns({ isSearch = false, isMy = false, isCart = false }: menuProps) {
  const btnCss = `hover:bg-slate-100 p-1.5 rounded-lg cursor-pointer z-1 transition-color duration-250`;
  return (
    <div className="flex gap-4">
      {!isSearch && (
        <Link href={"/search"} className={btnCss} aria-label="검색 버튼">
          <Search size={25} />
        </Link>
      )}
      {!isCart && <Link href={"/cart"} className={btnCss} aria-label="카트 버튼">
        <ShoppingCart size={25} />
      </Link>}

      {!isMy && (<Link href={"/my"} className={btnCss} aria-label="내 정보 버튼">
        <UserRound size={25} />
      </Link>)}
    </div>
  );
}
