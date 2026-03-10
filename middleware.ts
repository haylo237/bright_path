import { NextRequest, NextResponse } from "next/server";
import { routeAccessMap } from "@/shared/lib/settings";
import { resolveRole } from "@/backend/lib/auth";

const routeRules = Object.entries(routeAccessMap).map(([pattern, allowedRoles]) => ({
  regex: new RegExp(`^${pattern}$`),
  allowedRoles,
}));

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const role = resolveRole(req.cookies.get("bright_path_role")?.value);
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  const role = resolveRole(req.cookies.get("bright_path_role")?.value);

  for (const { regex, allowedRoles } of routeRules) {
    if (regex.test(pathname) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
