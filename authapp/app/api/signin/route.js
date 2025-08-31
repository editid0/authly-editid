import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { pool } from "@/lib/db"; // pg.pool object

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
	try {
		let { username, rhythm } = await req.json();
		if (!username || !rhythm)
			return NextResponse.json(
				{ error: "Username and rhythm required" },
				{ status: 400 }
			);
		username = String(username).toLowerCase().replace(/[^a-z0-9]/g, "");
		rhythm = String(rhythm).replace(/[^TGL]/g, "");

		if (!SECRET) {
			return NextResponse.json(
				{ error: "Server misconfiguration" },
				{ status: 500 }
			);
		}

		const cookieStore = cookies();

		const { rows } = await pool.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);
		const user = rows[0];
		if (!user)
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 401 }
			);

		const valid = await bcrypt.compare(rhythm, user.rhythm_hash);
		if (!valid)
			return NextResponse.json(
				{ error: "Invalid rhythm" },
				{ status: 401 }
			);

		const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

		// Secure cookies require HTTPS. On iOS Safari hitting http://IP:3000, a secure cookie will be dropped.
		const isProd = process.env.NODE_ENV === "production";
		cookieStore.set("auth", token, {
			httpOnly: true,
			secure: isProd, // allow over HTTP in dev
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 1000, // 1 hour
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("/api/signin error", err);
		return NextResponse.json(
			{ error: "Unexpected error" },
			{ status: 500 }
		);
	}
}
