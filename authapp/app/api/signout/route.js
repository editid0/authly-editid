import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
	cookies().delete("auth");
	return NextResponse.json({ success: true });
}

export async function GET() {
	const cookieObj = await cookies();
	cookieObj.delete("auth");
	return redirect("/");
}
