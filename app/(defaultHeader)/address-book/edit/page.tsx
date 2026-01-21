"use client"

import { addAddress } from "@/app/actions/address";
import InputField from "@/app/components/InputField";
import { signOut } from "next-auth/react";
import { useActionState, useEffect, useRef, useState } from "react";
const initialState = { ok: false } as const;

export default function Page() {
  const [label, setLabel] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [state, action, pending] = useActionState(addAddress, initialState);

  const done = useRef(false);

  useEffect(() => {
    if (!state?.ok) return;
    if (done.current) return;
    done.current = true;

    // 저장 성공하면 세션 종료 후 로그인으로
    signOut({ callbackUrl: "/address-book" });
  }, [state?.ok]);
  return (
    <form action={action}>
      <h2 className="text-center text-xl font-semibold">배송지 추가</h2>
      <InputField variant="box" label="배송지명" value={label} name="label" onChange={(e) => setLabel(e.target.value)} placeholder="배송지명을 입력해주세요. (예 : 집, 회사)" />
      <InputField variant="box" label="주소" value={address} name="address" onChange={(e) => setAddress(e.target.value)} placeholder="건물명, 도로명 또는 지번 검색 " />
      <InputField variant="box" label="휴대폰번호" value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} placeholder="휴대폰 번호를 입력해주세요." />
      <div className="flex items-center gap-2 pt-2">
        <input type="checkbox" name="isDefault" />
        <label htmlFor="isDefault" className="text-xs">기본 배송지 설정</label>
      </div>
      <button
        disabled={pending}
        className="self-center mt-4 w-full px-4 py-2 cursor-pointer text-sm bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 rounded-2xl  disabled:opacity-50"
      >
        {pending ? "추가 중..." : "추가하기"}
      </button>
    </form>
  );
}