interface props {
  id?: string;
  label: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

export default function AddreesCard({ label, address, phone, isDefault }: props) {
  return (
    <div className="flex flex-col gap-1 border border-gray-200 shadow p-4 text-sm rounded-lg">
      <p className=" font-semibold">{label} {isDefault ? <span className="text-xs text-blue-500">(기본)</span> : null}</p>
      <p>{address}</p>
      <p>{phone}</p>
      <div className="flex gap-2 ">
        <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer">수정</button>
        <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer">삭제</button>
      </div>
    </div >
  );
}