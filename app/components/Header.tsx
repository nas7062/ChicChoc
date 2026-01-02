import LogoImage from "./LogoImage";
import MenuBtns from "./MenuBtns";
import SearchInput from "./SearchInput";

interface HeaderProps {
  isSearch?: boolean;
  label?: string;
}

export default function Header({ isSearch = false, label }: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4  w-full">
      <LogoImage />
      {isSearch && (
        <div className="flex-1">
          <SearchInput />
        </div>
      )}
      {label && (
        < div className="flex-1">
          <p className="flex justify-center translate-x-13 font-semibold">마이페이지</p>
        </div>
      )}
      <MenuBtns isSearch={isSearch} />
    </div >
  );
}
