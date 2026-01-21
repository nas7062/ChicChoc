
import AddreesCard from "@/app/components/AddressCard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react"
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const addresses = await prisma.address.findMany({
    where: { userId: session?.user.id },
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
  });
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-xl  font-semibold">배송지 목록</h2>
      <Link href={'/address-book/edit'} className=" cursor-pointer flex justify-center hover:bg-gray-100 transition-colors duration-300 items-center w-full p-2 border border-gray-200 shadow">
        <Plus />
        <p>새 배송지 추가</p>
      </Link>
      {addresses.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          등록된 배송지가 없습니다.
        </p>
      ) : (
        addresses.map((address) => (
          <AddreesCard
            key={address.id}
            id={address.id}
            label={address.label ?? "배송지"}
            address={address.address}
            phone={address.phone ?? ""}
            isDefault={address.isDefault}
          />
        ))
      )}
    </div>
  );
}