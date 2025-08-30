"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint } from "lucide-react";
import { useState } from "react";

export default function SignUpUserInput() {
	const [username, setUsername] = useState("");
	const [rhythm, setRhythm] = useState("");

	function RhythmTapSpace() {
		return (
			<div className="mt-4">
				<Label htmlFor="rhythm" className={"mb-1"}>
					Tap a rhythm here:
				</Label>
				<div className="w-full h-[3cm] p-2 border-muted-foreground rounded-xl border-2 flex items-center justify-center space-x-2">
					<Fingerprint />
				</div>
			</div>
		);
	}

	return (
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
	);
}
