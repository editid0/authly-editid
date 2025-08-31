"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AddTask() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [open, setOpen] = useState(false);

	function addTask() {
		fetch("/api/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description, priority }),
		}).then((res) => {
			if (res.ok) {
				setOpen(false);
				setTitle("");
				setDescription("");
				setPriority("");
				window.location.reload();
			}
		});
	}

	useEffect(() => {
		if (isNaN(priority)) {
			setPriority("");
		} else {
			if (Number(priority) > 5) {
				setPriority("5");
			}
			if (Number(priority) < 0) {
				setPriority("0");
			}
		}
	}, [priority]);

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<Button
					variant="outline"
					className="w-full cursor-pointer"
					asChild
				>
					<DialogTrigger>Add Task</DialogTrigger>
				</Button>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New Task</DialogTitle>
						<DialogDescription>
							Please enter the details of your new task.
						</DialogDescription>
					</DialogHeader>
					<Input
						placeholder="Task title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Textarea
						placeholder="Task description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Input
						placeholder="Task priority (0-5, 5 is most important)"
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
					/>
					<Button className="mt-4 w-full" onClick={() => addTask()}>
						Add Task
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}
