"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ActionState =
  | { ok: true; message: string }
  | { ok: false; fieldErrors?: Record<string, string>; formError?: string };


export async function addAddress(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { ok: false, formError: "로그인이 필요합니다." };
    const userId = session.user.id;

    const label = formData.get("label") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const isDefault = formData.get("isDefault") != null;

    const fieldErrors: Record<string, string> = {};
    if (typeof label !== "string" || label.trim().length < 1) fieldErrors.label = "배송지명을 입력해주세요.";
    if (typeof address !== "string" || address.trim().length < 1) fieldErrors.address = "주소를 입력해주세요.";
    if (typeof phone !== "string" || phone.trim().length < 1) fieldErrors.phone = "휴대폰번호를 입력해주세요.";

    if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

    // 기본배송지로 추가할 때는 기존 기본배송지 해제 후 생성
    // 첫 배송지는 자동 기본 처리
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
          label: label,
          address: address,
          phone: phone,
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


export async function updateAddress(
  addressId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { ok: false, formError: "로그인이 필요합니다." };
    const userId = session.user.id;

    const label = formData.get("label") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const isDefault = formData.get("isDefault") != null;

    const fieldErrors: Record<string, string> = {};
    if (typeof label !== "string" || label.trim().length < 1)
      fieldErrors.label = "배송지명을 입력해주세요.";
    if (typeof address !== "string" || address.trim().length < 1)
      fieldErrors.address = "주소를 입력해주세요.";
    if (typeof phone !== "string" || phone.trim().length < 1)
      fieldErrors.phone = "휴대폰번호를 입력해주세요.";

    if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

    await prisma.$transaction(async (tx) => {
      // 체크하면 기존 기본 배송지 해제
      if (isDefault) {
        await tx.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        });
      }

      // 내 주소만 수정 가능(보안)
      await tx.address.update({
        where: { id: addressId, userId },
        data: {
          label: label.trim(),
          address: address.trim(),
          phone: phone.trim(),
          isDefault,
        },
      });
    });

    revalidatePath("/address-book");
    return { ok: true, message: "배송지가 수정되었습니다." };
  } catch (e) {
    return { ok: false, formError: "배송지 수정 중 오류가 발생했어요." };
  }
}


type DeleteActionState =
  | { ok: true }
  | { ok: false; formError: string };

export async function deleteAddress(
  addressId: string
): Promise<DeleteActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { ok: false, formError: "로그인이 필요합니다." };
    }

    const userId = session.user.id;

    await prisma.$transaction(async (tx) => {
      // 삭제할 주소 가져오기
      const target = await tx.address.findFirst({
        where: { id: addressId, userId },
      });
      if (!target) throw new Error("Not found");

      await tx.address.delete({
        where: { id: addressId },
      });

      // 기본 배송지였다면 → 다른 주소를 기본으로
      if (target.isDefault) {
        const next = await tx.address.findFirst({
          where: { userId },
          orderBy: { updatedAt: "desc" },
        });

        if (next) {
          await tx.address.update({
            where: { id: next.id },
            data: { isDefault: true },
          });
        }
      }
    });

    revalidatePath("/address-book");
    return { ok: true };
  } catch {
    return { ok: false, formError: "배송지 삭제 중 오류가 발생했습니다." };
  }
}
