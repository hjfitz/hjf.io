import { type NextRequest, NextResponse } from "next/server";

// middleware hack to get the pathname for build
export function middleware(request: NextRequest) {
		const headers = new Headers(request.headers)
		headers.set('x-pathname', request.nextUrl.pathname)

		return NextResponse.next({
				request: {
						headers,
				}
		})
}
