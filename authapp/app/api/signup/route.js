import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db"; // a pg.pool object

export async function POST(req) {
	const { username, rhythm } = await req.json();

	const hashedRhythm = await bcrypt.hash(rhythm, 10);

	var exists = await pool.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);

	if (exists.rows.length > 0) {
		return NextResponse.json({
			success: false,
			error: "User already exists",
		});
	}

	await pool.query(
		"INSERT INTO users (username, rhythm_hash) VALUES ($1, $2)",
		[username, hashedRhythm]
	);

	return NextResponse.json({ success: true });
}
