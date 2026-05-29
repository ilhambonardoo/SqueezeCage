import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuth = !!token;
  const userRole = token?.role || "";

  const onlySignIn = [
    "/dashboard",
    "/profile",
    "/kambing",
    "/timbangan",
    "/users",
  ];

  const isProtectedPage = onlySignIn.some((path) => pathname.startsWith(path));

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/users")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (isProtectedPage && !isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/users/:path*",
    "/login",
    "/register",
    "/kambing/:path*",
    "/timbangan:path*",
  ],
};
