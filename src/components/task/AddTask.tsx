import {useState} from "react"
import Task, {PaginationProps} from '@/types/Task'
import fetchTask from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'

export default function AddTask({code, pagination, setTasks, setPagination}: {code: string, pagination: PaginationProps, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>}) {
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
				setTasks(Array.isArray(tasks.data) ? tasks.data : [tasks.data])
				if("pagination" in tasks) {
					setPagination(tasks.pagination)
				}
				setTask('')
			}
		}
	}

	return (
			<form onSubmit={handleSubmit} className="flex items-center">
				<div className="mr-4 w-full">
					<input type="text" name="task" value={task} onChange={handleChange} placeholder="write your ide.." className="text-amber-700 px-2 rounded-l-2xl pl-4 text-stone-700 focus:outline-amber-700 h-6 w-full" />
				</div>
				<button className="px-4 py-2 ml-2 text-white bg-amber-700 text-sm hover:text-amber-300 rounded-2xl uppercase">Add</button>
			</form>
		)
}