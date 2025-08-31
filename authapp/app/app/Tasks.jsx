"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";

export default function TasksList({ tasks }) {
	const [taskList, setTaskList] = useState(tasks);
	const [searchTerm, setSearchTerm] = useState("");
	const [displayedList, setDisplayedList] = useState(tasks);
	const fuse = new Fuse(taskList, {
		keys: ["title", "description"],
		includeScore: true,
	});

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setDisplayedList(taskList);
		} else {
			const results = fuse.search(searchTerm);
			setDisplayedList(results.map((result) => result.item));
		}
	}, [searchTerm, taskList]);

	const handleTaskClick = (id, checked = null) => {
		const currentTask = taskList.find((task) => task.id === id);
		const newStatus =
			checked === null
				? currentTask.status === "completed"
					? "pending"
					: "completed"
				: checked
				? "completed"
				: "pending";

		setTaskList((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, status: newStatus } : task
			)
		);
		fetch("/api/tasks/checked", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, checked: newStatus === "completed" }),
		});
	};

	const deleteTask = async (id) => {
		setTaskList((prev) => prev.filter((task) => task.id !== id));
		await fetch("/api/tasks", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		});
	};

	return (
		<>
			<Input
				placeholder="Search..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className={"mt-2"}
			/>
			<div className="flex flex-col items-center justify-center gap-2 mt-2">
				{displayedList.map((task) => (
					<div
						key={task.id}
						className="border-2 border-muted-foreground/50 rounded-lg p-2 w-full flex flex-row items-center justify-start"
						onClick={() => handleTaskClick(task.id)}
					>
						<div
							className="mr-2"
							onClick={(e) => e.stopPropagation()}
						>
							<Checkbox
								checked={task.status === "completed"}
								onCheckedChange={(checked) =>
									handleTaskClick(task.id, checked)
								}
							/>
						</div>
						<div>
							<h3
								className={
									"text-lg font-semibold " +
									(task.status === "completed"
										? "line-through"
										: "")
								}
							>
								{task.title}
							</h3>
							<p
								className={
									"text-sm text-muted-foreground " +
									(task.status === "completed"
										? "line-through"
										: "")
								}
							>
								{task.description}
							</p>
							<p className="text-sm text-muted-foreground/80">
								Created:{" "}
								{moment(task.created_at).format(
									"MMMM Do YYYY, h:mm:ss a"
								)}
							</p>
						</div>
						<div className="right-0 ml-auto">
							<button
								className="bg-red-500 text-white rounded-lg px-4 py-2"
								onClick={() => deleteTask(task.id)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
