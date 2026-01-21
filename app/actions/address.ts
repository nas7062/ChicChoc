"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ActionState =
  | { ok: true; message: string }
  | { ok: false; fieldErrors?: Record<string, string>; formError?: string };

const initialState: ActionState = { ok: false };

export async function addAddress(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { ok: false, formError: "로그인이 필요합니다." };
    const userId = session.user.id;

    const label = formData.get("label");
    const address = formData.get("address");
    const phone = formData.get("phone");

    // checkbox: 체크되면 "on" 또는 값이 들어오고, 아니면 null
    const isDefault = formData.get("isDefault") != null;

    const fieldErrors: Record<string, string> = {};
    if (typeof label !== "string" || label.trim().length < 1) fieldErrors.label = "배송지명을 입력해주세요.";
    if (typeof address !== "string" || address.trim().length < 1) fieldErrors.address = "주소를 입력해주세요.";
    if (typeof phone !== "string" || phone.trim().length < 1) fieldErrors.phone = "휴대폰번호를 입력해주세요.";

    if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

    // 기본배송지로 추가할 때는 기존 기본배송지 해제 후 생성
    // (추가로: 첫 배송지는 자동 기본 처리)
    const hasAny = await prisma.address.count({ where: { userId } });

    const makeDefault = isDefault || hasAny === 0;

    await prisma.$transaction(async (tx) => {
      if (makeDefault) {
        await tx.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        });
      }

      await tx.address.create({
        data: {
          userId,
          label: label.trim(),
          address: address.trim(),
          phone: phone.trim(),
          isDefault: makeDefault,
        },
      });
    });

    revalidatePath("/address-book");
    return { ok: true, message: "배송지가 추가되었습니다." };
  } catch (e) {
    return { ok: false, formError: "배송지 추가 중 오류가 발생했어요." };
  }
}
