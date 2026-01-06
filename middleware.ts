import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const customToken = req.cookies.get("access_token")?.value;
  const nextAuthToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  //  둘 다 없으면 비로그인
  if (!customToken && !nextAuthToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  //  NextAuth 로그인은 검증 없이 통과
  if (nextAuthToken) {
    return NextResponse.next();
  }

  //  커스텀 JWT 로그인은 검증 필요
  try {
    await jwtVerify(customToken!, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/my", "/cart"],
};
