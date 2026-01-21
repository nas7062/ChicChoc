import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import AddressForm from "../../_components/AddressForm";

export default async function AddressEditIdsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const address = await prisma.address.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!address) notFound();

  return (
    <AddressForm
      mode="edit"
      addressId={address.id}
      initialValues={{
        label: address.label ?? "",
        address: address.address,
        phone: address.phone ?? "",
        isDefault: address.isDefault,
      }}
    />
  );
}
