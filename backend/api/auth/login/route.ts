import { getDefaultUserId, resolveRole } from "@/backend/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const role = resolveRole(String(formData.get("role") || "admin"));
  const providedUserId = String(formData.get("userId") || "").trim();
  const userId = providedUserId || getDefaultUserId(role);

  const response = NextResponse.redirect(new URL(`/${role}`, req.url));

  response.cookies.set("bright_path_role", role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  response.cookies.set("bright_path_user_id", userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
