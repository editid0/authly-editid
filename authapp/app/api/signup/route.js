import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db"; // a pg.pool object

export async function POST(req) {
	var { username, rhythm } = await req.json();
	username = username.toLowerCase();
	username = username.replace(/[^a-z0-9]/g, "");
	rhythm = rhythm.replace(/[^TGL]/g, "");

	if (!rhythm || rhythm.trim() === "") {
		return NextResponse.json(
			{ error: "Rhythm is required" },
			{ status: 400 }
		);
	}

	if (rhythm.length > 30) {
		return NextResponse.json(
			{ error: "Rhythm must be less than 30 characters" },
			{ status: 400 }
		);
	}


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
