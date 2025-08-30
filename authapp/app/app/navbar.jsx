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
	const [signedIn, setSignedIn] = useState(() => hasAuthCookie());

	useEffect(() => {
		let mounted = true;
		const check = () => {
			if (!mounted) return;
			setSignedIn(hasAuthCookie());
		};

		check();
		const id = setInterval(check, 1000);

		return () => {
			mounted = false;
			clearInterval(id);
		};
	}, []);

	return signedIn ? (
		<Button asChild>
			<Link href="/signin">Sign In</Link>
		</Button>
	) : (
		<Button asChild>
			<Link href="/api/signout">Sign Out</Link>
		</Button>
	);
}

export default function NavBar() {
	return (
		<>
			<div className="flex flex-row items-center justify-between p-4 bg-neutral-500/10">
				<div className="flex flex-row items-center justify-start">
					<h1>Testing</h1>
				</div>
				<div className="flex flex-row items-center justify-end">
					<SignInOutButton />
				</div>
			</div>
		</>
	);
}
