import Header from "@/app/components/Header";

export default function SearchHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Header isSearch />
      {children}
    </div>
  );
}
