import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function POST(req) {
	const cookieStore = await cookies();
	const auth = cookieStore.get("auth")?.value;
	const { title, description } = await req.json();

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
		"INSERT INTO tasks (title, user_id, description) VALUES ($1, $2, $3)",
		[title, userId, description]
	);
	return NextResponse.json({ success: true });
}

export async function DELETE(req) {
	const cookieStore = await cookies();
	const auth = cookieStore.get("auth")?.value;
	const { id } = await req.json();

	if (!auth) {
		return NextResponse.json({ error: "No auth token" }, { status: 401 });
	}
	var payload;
	try {
		payload = jwt.verify(auth, process.env.JWT_SECRET);
	} catch (err) {
		cookieStore.delete("auth");
		return NextResponse.json(
			{ authenticated: false, error: "invalid_token" },
			{ status: 401 }
		);
	}
	const userId = payload.userId;
	await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [
		id,
		userId,
	]);
	return NextResponse.json({ success: true });
}
