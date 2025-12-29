import LogoImage from "./LogoImage";
import MenuBtns from "./MenuBtns";
import SearchInput from "./SearchInput";

interface HeaderProps {
  isSearch?: boolean;
}

export default function Header({ isSearch = false }: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <LogoImage />
      {isSearch && <SearchInput />}
      <MenuBtns />
    </div>
  );
}
