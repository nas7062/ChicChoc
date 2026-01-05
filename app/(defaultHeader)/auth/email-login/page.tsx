"use client"
import InputField from "@/app/components/InputField";
import { useState } from "react";

export default function EamilLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <h2 className="font-semibold">이메일 로그인</h2>
      <InputField label="이메일" onChange={(e) => setEmail(e.target.value)} value={email} variant="box" type="email" required />
      <InputField label="비밀번호" onChange={(e) => setPassword(e.target.value)} value={password} variant="box" type="email" required />
    </div>
  );
}