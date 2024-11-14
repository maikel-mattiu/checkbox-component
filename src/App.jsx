import {
	createContext,
	useEffect
} from "react"
import { useImmerReducer } from "use-immer"
import ToDoMemo from "./ToDo"
import "./App.css"

export const TaskContext = createContext()

const getTasks = () => {
	const storedValue = window.localStorage.getItem("tasks")
	return JSON.parse(storedValue) || []
}

const getDarkMode = () => {
	const storedValue = window.localStorage.getItem("is-dark-mode")
	return JSON.parse(storedValue) || false
}

const initialState = {
	tasks: getTasks(),
	isDarkMode: getDarkMode(),
	editing: false
}

function reducer(draftState, action) {
	switch (action.type) {
		case "create-task": {
			draftState.tasks.push({ id: crypto.randomUUID(), task: action.payload })
			break
		}
		case "delete-task": {
			draftState.tasks = draftState.tasks.filter(
				(task) => task.id !== action.payload
			)
			break
		}
		case "edit-task": {
			draftState.tasks = draftState.tasks.map((task) =>
				task.id === action.payload.id
					? { ...task, task: action.payload.newTask }
					: task
			)
			break
		}
		case "toggle-completed": {
			draftState.tasks = draftState.tasks.map((task) =>
				task.id === action.payload
					? { ...task, isCompleted: !task.isCompleted }
					: task
			)
			break
		}
		case "set-dark-mode": {
			draftState.isDarkMode = action.payload
			break
		}
		case "set-editing": {
			draftState.editing = action.payload
			break
		}
		default:
			return draftState
	}
}
function App() {
	const [state, dispatch] = useImmerReducer(reducer, initialState)

	const { tasks, isDarkMode, editing } = state

	useEffect(() => {
		window.localStorage.setItem("is-dark-mode", isDarkMode)
	}, [isDarkMode]) 
	useEffect(() => {
		window.localStorage.setItem("tasks", JSON.stringify(tasks))
	}, [tasks])

	function createTask(task) {
		dispatch({ type: "create-task", payload: task })
	}

	function deleteTask(id) {
		dispatch({ type: "delete-task", payload: id })
	}

	function editTask(id, newTask) {
		dispatch({ type: "edit-task", payload: { id, newTask } })
	}

	function toggleCompleted(id) {
		dispatch({ type: "toggle-completed", payload: id })
	}

	function setIsDarkMode(isDarkMode) {
		dispatch({ type: "set-dark-mode", payload: isDarkMode })
	}

	function setEditing(editing) {
		dispatch({ type: "set-editing", payload: editing })
	}

	const values = {
		tasks,
		createTask,
		deleteTask,
		editTask,
		editing,
		setIsDarkMode,
		setEditing,
		isDarkMode,
		toggleCompleted
	}

	return (
		<>
			<TaskContext.Provider value={values}>
				<div
					className="wrapper"
					style={{
						"--color-bg": isDarkMode ? "black" : "white",
						"--color-text": isDarkMode ? "white" : "black"
					}}
				>
					<ToDoMemo />
				</div>
			</TaskContext.Provider>
		</>
	)
}

export default App
