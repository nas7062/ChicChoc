import LogoImage from "./LogoImage";
import MenuBtns from "./MenuBtns";
import SearchInput from "./SearchInput";

interface HeaderProps {
  isSearch?: boolean;
  label?: string;
  isMy?: boolean;
  isCart?: boolean;
  noBtn?: boolean
}

export default function Header({ isSearch = false, label, isMy, isCart, noBtn }: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4  w-full">
      <LogoImage />
      {isSearch && (
        <div className="flex-1">
          <SearchInput />
        </div>
      )}
      {label && (
        <div className="flex-1">
          <p className="flex justify-center translate-x-6 font-semibold">{label}</p>
        </div>
      )}
      <MenuBtns isSearch={isSearch} isMy={isMy} isCart={isCart} noBtn={noBtn} />
    </div >
  );
}
