import {useState} from "react"
import Task, {PaginationProps} from '@/types/Task'
import {CreateTask} from '@/services/task/QueryTask'

export default function AddTask({code, pagination, setTasks, setPagination}: {code: string, pagination: PaginationProps, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>}) {
	const [task, setTask] = useState<string>("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask(e.currentTarget.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setTask(e.currentTarget.value)
		
		CreateTask(code, task, pagination, setTask, setTasks, setPagination)
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