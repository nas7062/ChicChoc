import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/api/auth/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/my", "/cart"],
};
