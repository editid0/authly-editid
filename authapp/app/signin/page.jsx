import Link from "next/link";
import SignInUserInput from "./UserInput";

export default function SignInPage() {
	return (
		<div className="p-2">
			<div className="mx-auto w-full rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 p-2 md:w-[10cm]">
				<h1 className="text-muted-foreground text-center text-2xl">
					Sign In
				</h1>
				<div className="flex flex-row gap-1 text-muted-foreground items-center py-2 justify-center">
					<p>Don't have an account?</p>
					<Link
						href="/signup"
						className="font-semibold hover:underline"
					>
						Sign Up
					</Link>
				</div>
				<SignInUserInput />
			</div>
		</div>
	);
}
