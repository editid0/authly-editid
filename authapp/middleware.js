import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function middleware(req) {
	const token = req.cookies.get("auth")?.value;
	if (!token) return NextResponse.redirect(new URL("/signin", req.url));

	try {
		jwt.verify(token, SECRET);
		return NextResponse.next();
	} catch {
		return NextResponse.redirect(new URL("/signin", req.url));
	}
}

export const config = {
	matcher: ["/app/:path*"], // protect these routes
};
