import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddressForm from "../_components/AddressForm";

export default async function AddressCreatePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <AddressForm
      mode="create"
      initialValues={{ label: "", address: "", phone: "", isDefault: false }}
    />
  );
}