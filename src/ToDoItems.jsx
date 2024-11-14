import React from "react"
import { TaskContext } from "./App"
import EditInputTaskMemo from "./EditInputTask"
import { Edit2, X } from "react-feather"

function ToDoItems() {
	const {
		tasks,
		deleteTask,
		editTask,
		setEditing,
		editing,
		isDarkMode,
		toggleCompleted
	} = React.useContext(TaskContext)

	const [editingTaskId, setEditingTaskId] = React.useState(null)
	function handleEdit({ id, task }) {
		setEditingTaskId(id)
		setEditing(true)
		editTask(id, task)
	}

	return (
		<div className="todo-items">
			{tasks.map((task) => (
				<div
					className="todo-item"
					key={task.id}
				>
					{editing && editingTaskId === task.id ? (
						<EditInputTaskMemo taskIn={task} />
					) : (
						<>
							<input
								className={
									isDarkMode
										? "todo-checkbox-darkmode"
										: "todo-checkbox"
								}
								type="checkbox"
								checked={task.isCompleted || false}
								onChange={() => toggleCompleted(task.id)}
							/>
							<span
								className={`task ${task.isCompleted ? "completed" : ""}`}
							>
								{task.task}
							</span>
							<div>
								<button
									className={
										isDarkMode ? "todo-icon-darkmode" : "todo-icon"
									}
									onClick={() => {
										handleEdit(task)
									}}
								>
									<Edit2 size={24} />
								</button>
								<button
									className={
										isDarkMode ? "todo-icon-darkmode" : "todo-icon"
									}
									onClick={() => {
										deleteTask(task.id)
									}}
								>
									<X size={24} />
								</button>
							</div>
						</>
					)}
				</div>
			))}
		</div>
	)
}

const ToDoItemsMemo = React.memo(ToDoItems)
export default ToDoItemsMemo
