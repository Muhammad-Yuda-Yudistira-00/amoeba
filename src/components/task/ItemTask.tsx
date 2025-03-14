import Task, {PaginationProps} from '@/types/Task'
import fetchTask from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'
import {Trash2, Move} from "lucide-react"
import {showAlert} from "@/libs/showAlert"
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'


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
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id})

	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	}

	const handleDelete = async () => {
		const confirmed = await showAlert('task')
		if(confirmed) {
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
			ref={setNodeRef} 
			{...attributes} 
			{...listeners}
			style={style}
		>
			<div className="flex gap-4 px-4 md:px-0 items-center">
				<button 
					type="button" 
					className="hover:bg-amber-200 group h-full" 
					onClick={async () => await handleDelete()}
					onPointerDown={e => e.stopPropagation()}
				>
					<Trash2 size={20} className="stroke-stone-700 group-hover:stroke-stone-600" />
				</button>
				<div className="hover:bg-stone-700 w-[20px] h-[20px] group">
					<Move size={20} className="stroke-stone-700 group-hover:stroke-stone-100" />
				</div>
				<input 
					type="checkbox" 
					name="status" 
					checked={task.status === "done"} 
					onChange={async () => await handleStatus()} 
					onPointerDown={e => e.stopPropagation()}
					className="accent-stone-700 min-w-4 min-h-4" 
				/>
				<div
					className="w-full"
				>
					<li 
						data-key={task.id} 
						className={`text-red-700 border-b-2 border-stone-700 text-3xl md:text-5xl pt-2 px-4 decoration-amber-300 decoration-4 decoration-wavy w-full ${task.status === "done" ? "line-through" : ""} font-loversQuarrel selection:bg-amber-200`} 
						contentEditable 
						suppressContentEditableWarning={true}
						// dangerouslySetInnerHTML={{ __html: task.title }} 
						// onInput={e => setEditedText(e.currentTarget.innerText)}
						onBlur={handleBlur} 
						onPointerDown={e => e.stopPropagation()} 
						onKeyDown={e => {
							if(e.key === " ") {
								e.preventDefault()
								document.execCommand("insertText", false, " ")
							}
						}}
						data-dnd-kit-no-drag >
							{task.title}
						</li>
				</div>
			</div>					
		</div>
	)
}

export default ItemTask