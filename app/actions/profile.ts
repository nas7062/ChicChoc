"use server";


import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type State = { error?: string; success?: boolean };

function normalizePhone(input: string) {
  return input.replace(/[^\d]/g, "");
}

export async function updateBasicProfile(_: State, formData: FormData): Promise<State> {
  const session = await auth();
  if (!session?.user?.id) return { error: "로그인이 필요합니다." };

  const name = formData.get("name");
  const phone = formData.get("phone");

  if (typeof name !== "string" || name.trim().length < 2) {
    return { error: "이름은 2자 이상 입력해 주세요." };
  }
  if (typeof phone !== "string") return { error: "휴대폰 번호를 입력해 주세요." };

  const normalized = normalizePhone(phone);
  // 한국 휴대폰(010…) 간단 검증 (원하면 더 엄격하게 가능)
  if (!/^01[016789]\d{7,8}$/.test(normalized)) {
    return { error: "휴대폰 번호 형식이 올바르지 않습니다." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: name.trim(),
      phone: normalized, 
    },
  });

  
  return { success: true };
}
