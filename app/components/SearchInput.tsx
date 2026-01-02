import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative ">
      <input
        type="search"
        className="border border-gray-300 rounded-xl w-full h-8 pl-10 pr-4 text-sm"
      />
      <Search className="absolute left-2 top-1 text-gray-500" size={24} />
    </div>
  );
}
