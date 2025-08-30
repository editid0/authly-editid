import SignUpUserInput from "./UserInput";

export default function SignUpPage() {
	return (
		<div className="py-2">
			<div className="mx-auto w-full rounded-lg border-2 border-neutral-400 dark:border-neutral-700 bg-neutral-300 dark:bg-neutral-800 p-2 md:w-[10cm]">
				<h1 className="text-muted-foreground text-center text-2xl">
					Sign Up
				</h1>
				<SignUpUserInput />
			</div>
		</div>
	);
}
