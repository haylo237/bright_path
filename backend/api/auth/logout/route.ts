import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/sign-in", req.url));

  response.cookies.delete("bright_path_role");
  response.cookies.delete("bright_path_user_id");

  return response;
}
