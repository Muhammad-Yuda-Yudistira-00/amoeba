import {useState} from "react"
import Task, {PaginationProps} from '@/types/Task'

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function AddTask({code, pagination, setTasks}: {code: string, pagination: PaginationProps, setTasks: React.Dispatch<React.SetStateAction<Task[]>>}) {
	const [task, setTask] = useState<string>("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask(e.currentTarget.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new URLSearchParams()
		formData.append('title', task)
		setTask(e.currentTarget.value)
		fetch(`${apiweb}/checklist/${code}/task`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"x-api-key": apikey!
			},
			body: formData
		})
		.then(res => res.json())
		.then(() => {
			console.info("Success add new task.")
			setTask("")
			refreshTasks(code, pagination, setTasks)
		})
		.catch(err => console.error("Failed to add new task: ", err))
	}

	return (
			<form onSubmit={handleSubmit} className="flex items-center">
				<div>
					<input type="text" name="task" value={task} onChange={handleChange} placeholder="write your ide.." className="text-stone-900 px-2 rounded-l-2xl pl-4 text-lime-700 focus:ring-lime-600 focus:outline-lime-600 border-blue-700" />
				</div>
				<button className="px-4 py-2 ml-2 text-sm bg-transparent font-bold hover:bg-lime-700 border-4 rounded-2xl uppercase">Add</button>
			</form>
		)
}