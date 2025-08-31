import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
	const cookieStore = await cookies();
	const auth = cookieStore.get("auth")?.value;

	if (!auth) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}

	try {
		const payload = jwt.verify(auth, process.env.JWT_SECRET);
		return NextResponse.json({ authenticated: true, user: payload });
	} catch (err) {
		cookieStore.delete("auth");
		return NextResponse.json(
			{ authenticated: false, error: "invalid_token" },
			{ status: 401 }
		);
	}
}
