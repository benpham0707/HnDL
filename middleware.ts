import { NextResponse } from "next/server";

export default function middleware(request: Request) {
  // No-op middleware: authentication requirement removed
  return NextResponse.next();
}

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
