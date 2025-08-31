"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function TasksList({ tasks }) {
	const [taskList, setTaskList] = useState(tasks);
	const handleTaskClick = (id, checked = null) => {
		const currentTask = taskList.find((task) => task.id === id);
		console.log("Current task status:", currentTask.status);
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
	};

	return (
		<>
			<p>{JSON.stringify(taskList)}</p>
			<div>
				{taskList.map((task) => (
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
							<h3 className="text-lg font-semibold">
								{task.title}
							</h3>
							<p className="text-sm text-muted-foreground">
								{task.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
