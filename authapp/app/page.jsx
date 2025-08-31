import Image from "next/image";
import NavBar from "./app/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<NavBar />
			<h1 className="text-4xl font-bold text-center">Todo List App</h1>
			<p className="text-center text-muted-foreground text-xl">
				Manage your tasks efficiently
			</p>
			<div className="flex flex-col items-center justify-center mt-4 bg-accent w-fit p-2 mx-auto rounded-lg border-2 border-muted-foreground">
				<Image
					src={"/image.png"}
					alt="Todo List"
					width={500}
					height={300}
				/>
				<h2 className="text-2xl font-semibold text-center mt-2">
					Your tasks at a glance
				</h2>
				<p className="text-center text-muted-foreground">
					View all of your tasks, check them off, or delete them
					completely with one click.
				</p>
			</div>
			<p className="text-center max-w-[600px] mx-auto mt-2 text-muted-foreground">
				If you want to get started, click the button below to go to the
				app, or make an account if you don't have one.
			</p>
			<div className="flex justify-center">
				<Button variant="outline" className="mt-4" asChild>
					<Link href="/app">Get Started</Link>
				</Button>
			</div>
		</>
	);
}
