import LogoImage from "./LogoImage";
import MenuBtns from "./MenuBtns";
import SearchInput from "./SearchInput";

interface HeaderProps {
  isSearch?: boolean;
}

export default function Header({ isSearch = false }: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4  w-full">
      <LogoImage />
      {isSearch && (
        <div className="flex-1">
          <SearchInput />
        </div>
      )}
      <MenuBtns isSearch={isSearch} />
    </div>
  );
}
