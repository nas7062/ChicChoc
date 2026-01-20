export default function AddreesCard() {
  return (
    <div className="flex flex-col gap-1 border border-gray-200 shadow p-4 text-sm rounded-lg">
      <p className=" font-semibold">집</p>
      <p>인천 서구 봉오재1로 36 (신현동, 루원시티센트럴타운)</p>
      <p>김민석 (010-9314-7062)</p>
      <div className="flex gap-2 ">
        <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer">수정</button>
        <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer">삭제</button>
      </div>
    </div>
  );
}