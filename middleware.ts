import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { createServerClient } from "@supabase/ssr";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // =========================
  // 1. 기존 인증 로직 (유지)
  // =========================
  const customToken = req.cookies.get("access_token")?.value;
  const nextAuthToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  // 둘 다 없으면 비로그인
  if (!customToken && !nextAuthToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // NextAuth 로그인은 그대로 통과
  if (nextAuthToken) {
    return res;
  }

  // 커스텀 JWT 검증
  try {
    await jwtVerify(customToken!, secret);
  } catch {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // =========================
  // 2. Supabase 세션 동기화 (선택)
  // =========================
  // 목적: refresh token / user sync
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 세션 갱신 트리거 (중요)
  await supabase.auth.getUser();

  return res;
}

export const config = {
  matcher: ["/my", "/cart"],
};
