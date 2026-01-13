"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "../type";
import React, { useState } from "react";

interface Props {
  item: Product
}

export function Item({ item }: Props) {
  const router = useRouter()
  const [liked, setLiked] = useState(item.liked ?? false);

  const MoveDetail = () => {
    router.push(`/products/${item.id}`)
  }

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const res = await fetch(`/api/products/${item.id}/like`, {
      method: "POST",
    });

    if (res.status === 401) {
      alert("로그인이 필요합니다");
      return;
    }

    const data = await res.json();
    setLiked(data.liked);

  };

  return (
    <Card className="w-full p-0 overflow-hidden cursor-pointer gap-1" onClick={MoveDetail}>
      <CardHeader className="p-0 rouned-2xl overflow-hidden h-52 relative">
        <Image
          src={item.imageUrl}
          alt={item.title}
          priority
          width={200}
          height={300}
          className=" rouned-2xl overflow-hidden w-full h-52 hover:scale-110 transition-transform duration-300"
        />
        <button type="button" onClick={toggleLike}>
          <Heart className={`absolute  w-5 h-5 bottom-2 right-2 cursor-pointer ${liked ? "text-red-500  fill-red-500" : "text-gray-300 fill-gray-300"}`} />
        </button>
      </CardHeader>

      <CardContent className="p-1 flex flex-col gap-1">
        <CardTitle className="text-xs">{item.brand}</CardTitle>
        <CardDescription className="text-xs">
          {item.title}
        </CardDescription>
        <div className="flex gap-1 text-sm">
          <p className="text-blue-400">{item.discountRate}%</p>
          <p>{Number(item.price).toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-1 p-1 text-slate-500 ">
        <Star className={`w-4 h-4 cursor-pointer text-gray-300 `} />
        <p className="text-xs">{item.rating}</p>
        <p className="text-xs">({item.reviewCount})</p>
      </CardFooter>
    </Card>
  );
}
