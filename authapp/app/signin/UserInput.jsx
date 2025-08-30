"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { redirect } from "next/navigation";

function formatRhythm(rhythm) {
	const meanings = {
		T: "Tap",
		G: "Gap",
		L: "Long Gap",
	};
	return rhythm
		.split("")
		.map((char) => meanings[char] || char)
		.join(", ");
}

export default function SignInUserInput() {
	const [username, setUsername] = useState("");
	const [rhythm, setRhythm] = useState("");
	const [pressed, setPressed] = useState(false);
	const [lastAction, setLastAction] = useState(0); // time since last action
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (pressed) {
			const now = Date.now();
			if (lastAction === 0) {
				setRhythm("T");
				setLastAction(now);
			} else {
				var gap = now - lastAction;
				if (gap < 250) {
					setRhythm((prev) => prev + "T");
				} else if (gap < 500) {
					setRhythm((prev) => prev + "GT");
				} else {
					setRhythm((prev) => prev + "LT");
				}
				setLastAction(now);
			}
		}
	}, [pressed]);

	function submitSignin() {
		console.log("Submitting signin");
		fetch("/api/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				rhythm,
			}),
			credentials: "include",
		}).then(async (res) => {
			if (res.ok) {
				const data = await res.json();
				if (data.success) {
					redirect("/app");
				} else {
					setError(data.error);
				}
			} else {
				console.error("Signin failed");
				const data = await res.json();
				setError(data.error);
			}
		});
	}

	function RhythmTapSpace() {
		return (
			<div className="mt-4">
				<Label htmlFor="rhythm" className={"mb-1"}>
					Tap your rhythm here:
				</Label>
				{(() => {
					return (
						<div
							id="rhythm"
							role="button"
							tabIndex={0}
							onMouseDown={(e) => {
								e.preventDefault();
								setPressed(true);
							}}
							onMouseUp={() => setPressed(false)}
							onMouseLeave={() => setPressed(false)}
							onTouchStart={(e) => {
								e.preventDefault();
								setPressed(true);
							}}
							onTouchEnd={() => setPressed(false)}
							onKeyDown={(e) => {
								if (
									e.key === " " ||
									e.key === "Spacebar" ||
									e.key === "Enter"
								) {
									e.preventDefault();
									setPressed(true);
								}
							}}
							onKeyUp={(e) => {
								if (
									e.key === " " ||
									e.key === "Spacebar" ||
									e.key === "Enter"
								) {
									setPressed(false);
								}
							}}
							className={
								"w-full h-[3cm] p-2 border-muted-foreground rounded-xl border-2 flex items-center justify-center space-x-2 transition-colors duration-150 select-none"
							}
							style={{
								backgroundColor: pressed
									? "rgba(99,102,241,0.06)"
									: "transparent",
								userSelect: "none",
								WebkitUserSelect: "none",
								MozUserSelect: "none",
								msUserSelect: "none",
							}}
						>
							<Fingerprint />
						</div>
					);
				})()}
				<p>Current rhythm: {formatRhythm(rhythm) || "None"}</p>
				<Button
					onClick={() => {
						setRhythm("");
						setLastAction(0);
					}}
					variant={"outline"}
				>
					Clear rhythm
				</Button>
				<Button
					onClick={submitSignin}
					variant={"outline"}
					className={"w-full mt-2 disabled:opacity-50"}
					disabled={!username || !rhythm}
				>
					Submit
				</Button>
			</div>
		);
	}

	return (
		<>
			<div>
				<Label htmlFor="username">Username:</Label>
				<Input
					type="text"
					id="username"
					name="username"
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<RhythmTapSpace />
			</div>
			<Dialog open={error} onOpenChange={setError}>
				<DialogContent className={"bg-red-500/10 backdrop-blur-3xl"}>
					<DialogHeader>
						<DialogTitle>Error signing in</DialogTitle>
						<DialogDescription>{error}</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
