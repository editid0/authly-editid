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
import { useRouter } from "next/navigation";

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
	const [pressed, setPressed] = useState(false); // visual feedback
	const [lastAction, setLastAction] = useState(0); // timestamp of last tap
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// Register a single tap and append to rhythm based on time gap
	function registerTap() {
		const now = Date.now();
		if (lastAction === 0) {
			setRhythm("T");
			setLastAction(now);
			return;
		}
		const gap = now - lastAction;
		if (gap < 250) {
			setRhythm((prev) => prev + "T");
		} else if (gap < 500) {
			setRhythm((prev) => prev + "GT");
		} else {
			setRhythm((prev) => prev + "LT");
		}
		setLastAction(now);
	}

	// Global space bar listener (except when typing in username input)
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.code === "Space" || e.key === " ") {
				if (e.target && e.target.id === "username") return;
				if (e.repeat) return;
				e.preventDefault();
				setPressed(true);
				registerTap();
			}
		}
		function handleKeyUp(e) {
			if (e.code === "Space" || e.key === " ") {
				if (e.target && e.target.id === "username") return;
				setPressed(false);
			}
		}
		window.addEventListener("keydown", handleKeyDown, { passive: false });
		window.addEventListener("keyup", handleKeyUp, { passive: true });
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [lastAction]);

	async function submitSignin() {
		if (!username || !rhythm || loading) return;
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, rhythm }),
				credentials: "include",
				cache: "no-store",
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				throw new Error(data.error || "Request failed");
			}
			if (data.success) {
				// Use client navigation for mobile compatibility
				router.push("/app");
			} else {
				throw new Error(data.error || "Invalid credentials");
			}
		} catch (e) {
			setError(e.message || "Unknown error");
		} finally {
			setLoading(false);
		}
	}

	function RhythmTapSpace() {
		return (
			<div className="mt-4">
				<Label htmlFor="rhythm" className={"mb-1"}>
					Tap your rhythm here:
				</Label>
				<div
					id="rhythm"
					role="button"
					aria-label="Tap your secret rhythm"
					tabIndex={0}
					onPointerDown={(e) => {
						// Only handle primary pointer to avoid multi-touch or secondary clicks
						if (e.isPrimary === false) return;
						setPressed(true);
						registerTap();
					}}
					onPointerUp={() => setPressed(false)}
					onPointerCancel={() => setPressed(false)}
					onPointerLeave={() => setPressed(false)}
					// Keyboard taps handled globally via space listener
					className={
						"w-full h-[3cm] p-2 border-muted-foreground rounded-xl border-2 flex items-center justify-center space-x-2 transition-colors duration-150 select-none touch-none"
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
					type="button"
					className={"w-full mt-2 disabled:opacity-50"}
					disabled={!username || !rhythm || loading}
				>
					{loading ? "Submitting..." : "Submit"}
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
			<Dialog open={!!error} onOpenChange={() => setError(null)}>
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
