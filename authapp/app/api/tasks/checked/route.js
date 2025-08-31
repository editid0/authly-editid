import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function POST(req) {
	const cookieStore = await cookies();
	const auth = cookieStore.get("auth")?.value;
	const { id, checked } = await req.json();

	if (!auth) {
		return NextResponse.json({ error: "No auth token" }, { status: 401 });
	}
	var payload;
	try {
		payload = jwt.verify(auth, process.env.JWT_SECRET);
		console.log("Verified JWT payload:", payload);
	} catch (err) {
		cookieStore.delete("auth");
		return NextResponse.json(
			{ authenticated: false, error: "invalid_token" },
			{ status: 401 }
		);
	}
	const userId = payload.userId;
	await pool.query(
		"UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3",
		[checked ? "completed" : "pending", id, userId]
	);
	return NextResponse.json({ success: true });
}
