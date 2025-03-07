import Task, {PaginationProps} from '@/types/Task'
import fetchTask from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'
import {Trash2} from "lucide-react"


const ItemTask = ({
	task, 
	code,
	setTasks,
	handleBlur,
	pagination,
	setPagination
	}:{
		task: Task,
		code: string, 
		setTasks: React.Dispatch<React.SetStateAction<Task[]>>
		handleBlur: (e: React.FocusEvent) => void,
		pagination: PaginationProps,
		setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>
	}) => {

	const handleDelete = async () => {
		if(confirm("Wanna break this task?")) {
			// handleDeleteTask(task.id, setTasks, code, pagination, setPagination)
			const result = await fetchTask({code, method: HttpMethod.DELETE, taskId: task.id})
			if(result) {
				console.info("succes deleted task")
				const result = await fetchTask({code, currentPage: pagination.currentPage})
				if(result) {
					if(Array.isArray(result.data)) {
						setTasks(result.data) 
					}
					if('pagination' in result) {
						setPagination(result.pagination)
					}
				}
			}
		}
	}

	const handleStatus = async () => {
		const newStatus = task.status === 'done' ? 'in_progress' : 'done'

		const result = await fetchTask({code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', taskId: task.id, name: 'status', value: newStatus})
		if(result) {
			setTasks(prevTasks => prevTasks.map(prevTask => prevTask.id === task.id ? (Array.isArray(result.data) ? result.data[0] : result.data) : prevTask))
		}
	}

	return(
		<div 
			className="flex justify-between w-full"
		>
			<div className="flex gap-4 px-4 md:px-0 items-center">
				<button type="button" className="hover:bg-black group h-full" onClick={async () => {
					await handleDelete()
				}}>
					<Trash2 size={20} className="stroke-stone-700 group-hover:stroke-stone-500" />
				</button>
				<input type="checkbox" name="status" checked={task.status === "done"} onChange={async () => await handleStatus()} className="accent-stone-700 min-w-4 min-h-4" />
				<div
					className="w-full"
				>
					<li data-key={task.id} className={`text-black border-b-2 border-stone-700 text-3xl md:text-5xl pt-2 px-4 decoration-amber-600 decoration-4 decoration-wavy w-full ${task.status === "done" ? "line-through" : ""} font-loversQuarrel`} contentEditable dangerouslySetInnerHTML={{ __html: task.title }} onBlur={handleBlur} />
				</div>
			</div>					
		</div>
	)
}

export default ItemTask