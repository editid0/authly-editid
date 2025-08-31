import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
	const token = req.cookies.get("auth")?.value;
	if (!token) {
		return NextResponse.redirect(new URL("/signin", req.url));
	}

	try {
		await jwtVerify(token, SECRET);
		return NextResponse.next();
	} catch (err) {
		return NextResponse.redirect(new URL("/signin", req.url));
	}
}

export const config = {
	matcher: ["/app/:path*"], // protect these routes
};
