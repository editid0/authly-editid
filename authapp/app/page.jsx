import Image from "next/image";
import NavBar from "./app/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrollToFeatures from "./ScrollToFeatures";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="h-[95vh] flex flex-col justify-center gap-2 items-center">
				<h1 className="text-4xl font-bold text-center">Todo List App</h1>
				<p className="text-center text-muted-foreground text-xl">
					Manage your tasks efficiently
				</p>
				<Button variant="outline" className="mt-4" asChild>
					<Link href="/app">Get Started</Link>
				</Button>
				<p className="text-center text-muted-foreground mt-4">Scroll for features, info, and FAQs</p>
				<ScrollToFeatures />
			</div>
			<div id="features" className="pb-6 flex flex-col items-center justify-center gap-4 mx-2">
				<h2 className="text-3xl text-center font-semibold">Features</h2>
				<div className="m-2 p-2 md:max-w-[15cm] mx-auto bg-accent border-2 border-muted-foreground rounded-lg w-fit">
					<h3 className="text-xl font-semibold text-center">One click delete</h3>
					<Image
						src={"/image2.png"}
						alt="Todo List"
						width={500}
						height={300}
						className="mx-auto"
					/>
					<p className="text-center text-muted-foreground">
						Quickly remove tasks with a single click.
					</p>
				</div>
				<div className="m-2 p-2 md:max-w-[15cm] mx-auto bg-accent border-2 border-muted-foreground rounded-lg w-fit">
					<h3 className="text-xl font-semibold text-center">View details</h3>
					<Image
						src={"/image3.png"}
						alt="Todo List"
						width={500}
						height={300}
						className="mx-auto"
					/>
					<p className="text-center text-muted-foreground">
						View details about a task like when it was created, and what it's priority is.
					</p>
				</div>
				<div className="m-2 p-2 md:max-w-[15cm] mx-auto bg-accent border-2 border-muted-foreground rounded-lg w-fit">
					<h3 className="text-xl font-semibold text-center">Fuzzy searching</h3>
					<Image
						src={"/image4.png"}
						alt="Todo List"
						width={500}
						height={300}
						className="mx-auto"
					/>
					<p className="text-center text-muted-foreground">
						Quickly find tasks based in their title or their description.
					</p>
				</div>
				<div className="m-2 p-2 md:max-w-[15cm] mx-auto bg-accent border-2 border-muted-foreground rounded-lg w-fit">
					<h3 className="text-xl font-semibold text-center">Unique authentication</h3>
					<Image
						src={"/image5.png"}
						alt="Todo List"
						width={500}
						height={300}
						className="mx-auto"
					/>
					<p className="text-center text-muted-foreground">
						Come up with your own rhythm and use that to log in. No passwords required.
					</p>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center gap-4 mx-2 pb-6">
				<div className="flex flex-col items-center justify-center gap-4 w-full m-2 p-2 md:max-w-[15cm] mx-auto bg-accent border-2 border-muted-foreground rounded-lg">
					<h2 className="text-3xl font-semibold">Auth system explained</h2>
					<p className="text-center text-muted-foreground">
						Instead of using a password, you create a rhythm, which you tap out on a button, the rhythm can have gaps, long gaps, or no gap between taps. Your rhythm is then securely stored by being hashed, just like a password would be, so even if someone accesses the database, they won't be able to find out your rhythm. It is important to make sure you remember your rhythm, as there is currently no way to restore your rhythm, or recover it if forgotten.
					</p>
				</div>
				<div className="m-2 p-2 md:max-w-[15cm] mx-auto bg-accent border-2 border-muted-foreground rounded-lg w-fit">
					<h2 className="text-3xl text-center font-semibold">FAQs</h2>
					<div className="text-center text-muted-foreground">
						<p className="font-semibold text-lg">What is a rhythm?</p>
						<p>A rhythm is a unique pattern of taps that you create and use to log in.</p>
					</div>
					<div className="text-center text-muted-foreground">
						<p className="font-semibold text-lg">How is my rhythm stored?</p>
						<p>Your rhythm is securely hashed and stored in the database, just like a password.</p>
					</div>
					<div className="text-center text-muted-foreground">
						<p className="font-semibold text-lg">What if I forget my rhythm?</p>
						<p>Unfortunately, there is currently no way to recover your forgotten rhythm.</p>
					</div>
				</div>
			</div>
		</>
	)
}
