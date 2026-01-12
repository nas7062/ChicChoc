
import { Suspense } from "react";
import SearchContent from "./_components/SearchContent";

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}