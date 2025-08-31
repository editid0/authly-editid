"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

function hasAuthCookie() {
	return (
		typeof document !== "undefined" &&
		document.cookie
			.split(";")
			.some((item) => item.trim().startsWith("auth="))
	);
}

function SignInOutButton() {
	// make a request to /api/status to check if authenticated
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const res = await fetch("/api/status");
			if (res.ok) {
				const data = await res.json();
				setSignedIn(data.authenticated);
			}
		};

		checkAuth();
	}, []);

	return signedIn ? (
		<Button asChild>
			<Link href="/api/signout">Sign Out</Link>
		</Button>
	) : (
		<Button asChild>
			<Link href="/signin">Sign In</Link>
		</Button>
	);
}

export default function NavBar() {
	return (
		<>
			<div className="flex flex-row items-center justify-between p-4 bg-neutral-500/10">
				<div className="flex flex-row items-center justify-start">
					<Link href="/app">Todo List App</Link>
				</div>
				<div className="flex flex-row items-center justify-end">
					<SignInOutButton />
				</div>
			</div>
		</>
	);
}
