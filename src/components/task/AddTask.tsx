import {useState} from "react"
import Task, {PaginationProps} from '@/types/Task'
import fetchTask from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'

export default function AddTask({code, pagination, setTasks, setPagination, activePage}: {code: string, pagination: PaginationProps, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>, activePage: number}) {
	const [task, setTask] = useState<string>("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask(e.currentTarget.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(!task.trim()) return
	
		const result = await fetchTask({code, method: HttpMethod.POST, contentType: 'application/x-www-form-urlencoded', name: 'title', value: task, currentPage: pagination.currentPage})
		if(result) {
			const tasks = await fetchTask({code, currentPage: pagination.currentPage})
			if(tasks) {
				setTasks(tasks.data)
				setPagination(tasks.pagination)
				setTask('')
			}
		}
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