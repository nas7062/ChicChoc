import Header from "@/app/components/Header";

export default function SearchHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isSearch />
      {children}
    </>
  );
}
