"use client"

import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteAddress } from "../actions/address";
import { DeleteModal } from "./DeleteModal";

interface props {
  id?: string;
  label: string;
  address: string;
  phone: string;
  isDefault: boolean;
  isUpdate?: boolean
}

export default function AddreesCard({ id, label, address, phone, isDefault, isUpdate = false }: props) {

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!id) return;
    startTransition(async () => {
      const res = await deleteAddress(id);
      if (res.ok) {
        router.refresh();
      } else {
        alert(res.formError);
      }
    });
  };


  return (
    <div className="flex flex-col gap-1 border border-gray-200 shadow p-4 text-sm rounded-lg">
      <p className=" font-semibold">{label} {isDefault ? <span className="text-xs text-blue-500">(기본)</span> : null}</p>
      <p>{address}</p>
      <p>{phone}</p>
      {isUpdate && id && <div className="flex gap-2 ">
        <button onClick={() => router.push(`/address-book/edit/${id}`)} className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer">수정</button>
        <DeleteModal
          title="배송지를 삭제할까요?"
          description="삭제하면 되돌릴 수 없어요."
          confirmText={pending ? "삭제 중..." : "삭제"}
          cancelText="취소"
          disabled={pending}
          onConfirm={handleDelete}
          trigger={
            <button className="text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer">
              삭제
            </button>
          }
        />
      </div>
      }
    </div >
  );
}