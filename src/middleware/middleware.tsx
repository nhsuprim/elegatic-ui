import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    exp?: number;
    email?: string;
    role?: string;
};

const LOGIN_PAGE = "/login"; // ✅ consistent with logout

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const { pathname } = request.nextUrl;

    let isValidToken = false;

    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            isValidToken = !!decoded.exp && decoded.exp > Date.now() / 1000;
        } catch {
            isValidToken = false;
        }
    }

    // ✅ Already logged in? Login page এ যেতে দেবো না
    if (pathname === LOGIN_PAGE && isValidToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // ✅ Protected route, token নেই বা expire — login এ পাঠাও
    if (
        pathname.startsWith("/dashboard") &&
        pathname !== LOGIN_PAGE &&
        !isValidToken
    ) {
        const loginUrl = new URL(LOGIN_PAGE, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
