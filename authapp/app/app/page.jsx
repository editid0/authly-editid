import { Button } from "@/components/ui/button";
import TasksList from "./Tasks";
import { pool } from "@/lib/db";
import AddTask from "./AddTask";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function ProtectedPage() {
	const cookieObj = await cookies();
	const auth = cookieObj.get("auth")?.value;
	const decoded = jwt.verify(auth, process.env.JWT_SECRET);
	const userId = decoded.userId;

	const tasks_raw = await pool.query(
		"SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
		[userId]
	);
	const tasks = tasks_raw.rows;

	return (
		<>
			<h1 className="text-3xl font-bold text-center">Todo List App</h1>
			<p className="text-center text-muted-foreground">
				A relatively simple todo list, made for authly YSWS.
			</p>
			<div className="bg-muted m-2 p-2 w-full md:max-w-[15cm] mx-auto rounded-2xl border-2 border-muted-foreground">
				<h1 className="text-2xl font-bold text-center">Your Tasks</h1>
				<AddTask />
				<TasksList tasks={tasks} />
			</div>
		</>
	);
}
