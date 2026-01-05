import { Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
    <div>
      <Image src={"/logo.jpg"} alt="로고" width={80} height={80} className="rounded-full" />
    </div>
    <div>
      <p className="text-gray-500 text-sm">로그인 후 혜택을 받아봐요!</p>
    </div>
    <div className="flex flex-col gap-2">
      <Link href={"/auth/email-login"} className="relative group">
        <button className="bg-slate-700 text-sm text-white px-20 py-2 rounded-2xl cursor-pointer group-hover:bg-slate-800 transition-colors duration-300">이메일 로그인 </button>
        <Mail className="absolute left-2 top-1.5 text-white cursor-pointer " strokeWidth={1} />
      </Link>
      <div className="relative group">
        <button className="bg-amber-300 text-white text-sm px-20 py-2 rounded-2xl cursor-pointer group-hover:bg-amber-400 transition-colors duration-300">카카오 로그인 </button>
        <MessageCircle className="absolute left-2  top-1.5 text-black fill-black cursor-pointer" strokeWidth={1} />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <p>아직 회원이 아니신가요?</p>
        <Link href={"/auth/signup"} className="text-gray-500 hover:text-gray-700 cursor-pointer">회원가입</Link>
      </div>
    </div>
  </div>
}