
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const roleId = token?.role_id as number | null;

    const isAuthPage = request.nextUrl.pathname.startsWith('/login')
    const isProtectedPageAdmin = request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/admin')
    const { pathname } = request.nextUrl;

    // ไม่มี token
    // if (!token && (isProtectedPageAdmin )) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }


    // มี token แล้วเข้าหน้า / หรือ /auth/signin → redirect ตาม role
    if (token && (pathname === "/" || isAuthPage)) {
        if (roleId == 1) return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/admin/:path*',
        '/login'
    ],
}