import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUserId() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  try {
    return verifyToken(token).userId;
  } catch {
    return null;
  }
}
