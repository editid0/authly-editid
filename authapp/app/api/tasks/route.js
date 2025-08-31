import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function POST(req) {
	const cookieStore = await cookies();
	const auth = cookieStore.get("auth")?.value;
	var { title, description, priority } = await req.json();

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

	if (!title || title.trim() === "") {
		return NextResponse.json(
			{ error: "Title is required" },
			{ status: 400 }
		);
	}
	if (title.length > 255) {
		return NextResponse.json(
			{ error: "Title must be less than 255 characters" },
			{ status: 400 }
		);
	}
	if (!priority || priority.trim() === "") {
		priority = 0;
	}
	if (isNaN(priority)) {
		return NextResponse.json(
			{ error: "Priority must be a number" },
			{ status: 400 }
		);
	}
	if (Number(priority) > 5) {
		return NextResponse.json(
			{ error: "Priority must be between 0 and 5" },
			{ status: 400 }
		);
	}
	if (Number(priority) < 0) {
		return NextResponse.json(
			{ error: "Priority must be between 0 and 5" },
			{ status: 400 }
		);
	}
	const userId = payload.userId;
	await pool.query(
		"INSERT INTO tasks (title, user_id, description, priority) VALUES ($1, $2, $3, $4)",
		[title, userId, description, priority]
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
