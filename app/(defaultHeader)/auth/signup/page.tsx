"use client"
import InputField from "@/app/components/InputField";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingUpPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isNameValid = name.trim().length >= 2;
  const isPasswordValid = password.length >= 6;
  const isPasswordConfirmBalid = password === passwordConfirm;
  const router = useRouter()
  const isDisabled = !isEmailValid || !isNameValid || !isPasswordValid || isLoading || !isPasswordConfirmBalid;
  const onSubmit = async () => {
    if (isDisabled) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      if (response.status === 201) router.replace('/signin')
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold">회원가입</h2>
      <InputField label="이메일" onChange={(e) => setEmail(e.target.value)} value={email} variant="box" type="email" required placeholder="text@email.com" />
      <InputField label="이름" onChange={(e) => setName(e.target.value)} value={name} variant="box" type="text" required placeholder="김OO" />
      <InputField label="비밀번호" onChange={(e) => setPassword(e.target.value)} value={password} variant="box" type="password" required placeholder="영문,숫자 포함 6자 이상" />
      <InputField label="비밀번호 확인" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} variant="box" type="password" required placeholder="영문,숫자 포함 6자 이상" />
      <button onClick={onSubmit} disabled={isDisabled} className="w-full bg-blue-400 text-white py-2 rounded-2xl hover:bg-blue-500 transition-colors duration-300 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed">회원가입</button>
      <div className="flex justify-center gap-4 text-xs text-gray-400">
        <p>아직 회원이 아니신가요?</p>
        <p className="text-gray-500 hover:text-gray-700 cursor-pointer">회원가입</p>
      </div>
    </div>
  );
}