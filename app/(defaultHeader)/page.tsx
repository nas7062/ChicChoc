import Category from "../components/Category";
import Banner from "./_components/Banner";
import ItemListClient from "./_components/ItemListClient";

export default function Home() {
  return (
    <div>
      <Banner />
      <Category />
      <ItemListClient />
    </div>
  );
}