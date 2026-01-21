"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import InputField from "@/app/components/InputField";
import { signOut, useSession } from "next-auth/react";
import { updateBasicProfile } from "@/app/actions/profile";

const initialState: { error?: string; success?: boolean } = {};

export default function BasicProfileForm() {
  const { data: session, } = useSession();
  const [name, setName] = useState(session?.user.name);
  const [phone, setPhone] = useState(session?.user.phone);
  const [state, action, pending] = useActionState(updateBasicProfile, initialState);

  const done = useRef(false);

  useEffect(() => {
    if (!state?.success) return;
    if (done.current) return;
    done.current = true;

    // 저장 성공하면 세션 종료 후 로그인으로
    signOut({ callbackUrl: "/auth/signin" });
  }, [state?.success]);
  return (
    <form action={action} className="flex flex-col gap-3 border rounded-lg p-4">
      <div className="flex gap-2 items-center">
        <h2 className="font-semibold">기본 정보</h2>
        <p className="text-xs text-red-500">변경 후 다시 로그인 해야 합니다.</p>
      </div>
      <div className="flex flex-col  ">
        <InputField variant="box" label="이름" name="name" placeholder="이름" value={name || ''} onChange={(e) => setName(e.target.value)} />
        <InputField variant="box" label="휴대폰 번호" name="phone" placeholder="휴대폰 번호를 입력해주세요." value={phone || ''} onChange={(e) => setPhone(e.target.value)} />


        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        {state?.success && <p className="text-sm text-green-600">저장되었습니다.</p>}

        <button
          disabled={pending}
          className="self-center mt-4 px-4 py-1 cursor-pointer text-sm bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 rounded-2xl  disabled:opacity-50"
        >
          {pending ? "저장 중..." : "수정"}
        </button>
      </div>
    </form>
  );
}
