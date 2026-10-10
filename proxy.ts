import { NextRequest, NextResponse } from "next/server";
import { api } from "@/app/api/api";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const sessionId = request.cookies.get("sessionId")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (accessToken && sessionId) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (refreshToken && sessionId) {
    try {
      const rawCookie = request.headers.get("cookie") ?? "";

      const res = await api.post("/auth/refresh", null, {
        headers: { Cookie: rawCookie },
      });

      const setCookie = res.headers["set-cookie"];

      if (setCookie && setCookie.length > 0) {
        const jar = new Map<string, string>();
        const addPair = (pair: string) => {
          const trimmed = pair.trim();
          const i = trimmed.indexOf("=");
          if (i > 0) jar.set(trimmed.slice(0, i), trimmed);
        };

        rawCookie.split(";").forEach(addPair);
        setCookie.forEach((c) => addPair(c.split(";")[0]));

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("cookie", [...jar.values()].join("; "));

        const response = isAuthRoute
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next({ request: { headers: requestHeaders } });

        setCookie.forEach((c) => response.headers.append("set-cookie", c));

        return response;
      }
    } catch {}
  }

  if (isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
