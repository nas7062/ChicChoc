import { NextResponse } from "next/server";
import { addItemsToCart } from "@/lib/cart";
import { CartOptionItem } from "@/app/components/BottomSheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = (await req.json()) as { items: CartOptionItem[] };

    const result = await addItemsToCart(userId, body.items);

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}
