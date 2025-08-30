import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { pool } from "@/lib/db"; // pg.pool object

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
	const { username, rhythm } = await req.json();

	const { rows } = await pool.query(
		"SELECT * FROM users WHERE username = $1",
		[username]
	);
	const user = rows[0];
	if (!user)
		return NextResponse.json({ error: "User not found" }, { status: 401 });

	const valid = await bcrypt.compare(rhythm, user.rhythm_hash);
	if (!valid)
		return NextResponse.json({ error: "Invalid rhythm" }, { status: 401 });

	// create a jwt
	const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

	// set cookie
	cookies().set("auth", token, { httpOnly: true, secure: true });

	return NextResponse.json({ success: true });
}
