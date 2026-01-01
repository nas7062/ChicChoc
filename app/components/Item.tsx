import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export function Item() {
  return (
    <Card className="w-full p-0 overflow-hidden cursor-pointer gap-1">
      <CardHeader className="p-0 rouned-2xl overflow-hidden h-52">
        <Image
          src={"/bannerImage2.jpg"}
          alt="아이템"
          priority
          width={200}
          height={300}
          className=" rouned-2xl overflow-hidden w-full h-52 hover:scale-110 transition-transform duration-300"
        />
      </CardHeader>
      <CardContent className="p-1 flex flex-col gap-1">
        <CardTitle className="text-xs">디어먼트</CardTitle>
        <CardDescription className="text-xs">
          [연말세일] 울 70% 섬세한 하프코트 폭풍세일
        </CardDescription>
        <div className="flex gap-1 text-sm">
          <p className="text-blue-400">35%</p>
          <p>{Number(125000).toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-1 p-1 text-slate-500 ">
        <Star className="text-gray-300 w-4 h-4" />
        <p className="text-xs">4.8</p>
        <p className="text-xs">(10012)</p>
      </CardFooter>
    </Card>
  );
}
