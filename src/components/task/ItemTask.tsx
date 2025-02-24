import Task, {PaginationProps} from '@/types/Task'
import fetchTask, {handleDeleteTask} from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'
import {Trash2} from "lucide-react"
import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"


const ItemTask = ({
	task, 
	code,
	setTasks,
	handleChange,
	handleBlur,
	pagination,
	setPagination
	}:{
		task: Task,
		code: string, 
		setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
		handleChange: (taskId: number) => void,
		handleBlur: (e: React.FocusEvent) => void,
		pagination: PaginationProps,
		setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>
	}) => {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id})

	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	}

	const handleDelete = async () => {
		if(confirm("Wanna break this task?")) {
			// handleDeleteTask(task.id, setTasks, code, pagination, setPagination)
			const result = await fetchTask({code, method: HttpMethod.DELETE, taskId: task.id})
			if(result) {
				console.info("succes deleted task")
				const result = await fetchTask({code, currentPage: pagination.currentPage})
				if(result) {
					setTasks(result.data)
					setPagination(result.pagination)
				}
			}
		}
	}

	return(
		<div 
			className="flex justify-between w-full"
		>
			<div className="flex gap-4 px-28">
				<button type="button" onClick={async () => {
					await handleDelete()
				}}>
					<Trash2 size={20} />
				</button>
				<input type="checkbox" name="status" checked={task.status === "done"} onChange={() => handleChange(task.id)} className="accent-lime-600" />
				<div
					ref={setNodeRef}
					{...attributes}
					{...listeners}
					style={{
						...style,
						touchAction: "none"
					}}
					className="w-full"
				>
					<li data-key={task.id} className={`text-stone-400 border-b-2 border-yellow-800 text-lg pt-2 px-4 decoration-white w-full ${task.status === "done" ? "line-through" : ""}`} contentEditable dangerouslySetInnerHTML={{ __html: task.title }} onBlur={handleBlur} />
				</div>
			</div>					
		</div>
	)
}

export default ItemTask