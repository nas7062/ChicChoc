import Header from "@/app/components/Header";
import Banner from "./_components/Banner";

export default function DefaultHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Banner />
      {children}
    </div>
  );
}
