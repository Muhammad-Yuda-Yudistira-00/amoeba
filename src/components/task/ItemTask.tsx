import Task, {PaginationProps} from '@/types/Task'
import fetchTask from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'
import {Trash2, Move} from "lucide-react"
import {showAlert} from "@/libs/showAlert"
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {useState} from 'react'
import SubtaskInput from '@/components/elements/task/SubtaskInput'
import TaskMenu from '@/components/elements/task/TaskMenu'

const ItemTask = ({
	task, 
	code,
	setTasks,
	handleBlur,
	pagination,
	setPagination,
	openTask,
	setOpenTask,
	inputSubTask,
	setInputSubTask
	}:{
		task: Task,
		code: string, 
		setTasks: React.Dispatch<React.SetStateAction<Task[]>>
		handleBlur: (e: React.FocusEvent) => void,
		pagination: PaginationProps,
		setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>,
		openTask: number | null,
		setOpenTask: React.Dispatch<React.SetStateAction<number | null>>,
		inputSubTask: number | null,
		setInputSubTask: React.Dispatch<React.SetStateAction<number | null>>
	}) => {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id})
	const [isOpenInput, setIsOpenInput] = useState<boolean>(false)

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		marginLeft: `${task.level * 40 - 40}px` 
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

		const result = await fetchTask({code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', taskId: task.id, name: 'status', value: newStatus, level: task.level})
		if(result) {
			setTasks(prevTasks => prevTasks.map(prevTask => prevTask.id === task.id ? (Array.isArray(result.data) ? result.data[0] : result.data) : prevTask))
		}
	}

	return(
		<div 
			className={`flex flex-col justify-between w-full px-2 md:px-0`}
			ref={setNodeRef} 
			{...attributes} 
			{...listeners}
			style={style}
		>
			<div className={`flex gap-1 md:gap-4 items-center border-b-2 border-stone-400 w-full`}>
				<button 
					type="button" 
					className="hidden md:inline-block hover:bg-amber-200 group md:h-12" 
					onClick={async () => await handleDelete()}
					onPointerDown={e => e.stopPropagation()}
				>
					<Trash2 className="stroke-stone-700 group-hover:stroke-stone-600 w-3 md:w-5 h-3 md:h-5" />
				</button>
				<div className="hover:bg-stone-700 w-[20px] h-[20px] group md:h-12 flex items-center">
					<Move className="stroke-stone-700 group-hover:stroke-stone-100 w-3 md:w-5 h-3 md:h-5" />
				</div>
				<TaskMenu code={code} task={task} setTasks={setTasks} pagination={pagination} setPagination={setPagination} openTask={openTask} setOpenTask={setOpenTask} setInputSubTask={setInputSubTask} setIsOpenInput={setIsOpenInput} onDelete={handleDelete} />
				<input 
					type="checkbox" 
					name="status" 
					checked={task.status === "done"} 
					onChange={async () => await handleStatus()} 
					onPointerDown={e => e.stopPropagation()}
					className="accent-stone-700 w-3 h-3 md:w-5 md:h-5" 
				/>
				<div
					className="w-full"
				>
					<li 
						data-key={task.id} 
						className={`text-blue-700 text-2xl md:text-5xl pt-0 md:pt-2 px-1 md:px-4 decoration-amber-300 decoration-4 decoration-wavy w-full ${task.status === "done" ? "line-through" : ""} font-loversQuarrel selection:bg-amber-200`} 
						contentEditable 
						suppressContentEditableWarning={true}
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
			<SubtaskInput code={code} task={task} inputSubTask={inputSubTask} setTasks={setTasks} pagination={pagination} setPagination={setPagination} isOpenInput={isOpenInput} setIsOpenInput={setIsOpenInput} />
		</div>
	)
}

export default ItemTask