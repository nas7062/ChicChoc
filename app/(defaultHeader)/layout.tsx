import Header from "@/app/components/Header";

export default function DefaultHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
