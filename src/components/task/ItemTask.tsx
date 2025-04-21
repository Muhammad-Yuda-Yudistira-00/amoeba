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
import {useDispatch} from 'react-redux'
import {AppDispatch} from '@/redux/store'
import {updateTask, deleteTask} from '@/redux/slices/checklistSlice'

const ItemTask = ({
	task, 
	code,
	openTask,
	setOpenTask,
	inputSubTask,
	setInputSubTask,
	}:{
		task: Task,
		code: string, 
		openTask: number | null,
		setOpenTask: React.Dispatch<React.SetStateAction<number | null>>,
		inputSubTask: number | null,
		setInputSubTask: React.Dispatch<React.SetStateAction<number | null>>
	}) => {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id})
	const [isOpenInput, setIsOpenInput] = useState<boolean>(false)
	const dispatch = useDispatch<AppDispatch>()

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		marginLeft: `${task.level * 40 - 40}px` 
	}

	const handleBlur2 = async (e: React.FocusEvent<Element>, taskId: number, level?: number) => {
		const title = (e.currentTarget as HTMLElement).innerText

		dispatch(updateTask({code, taskId, field: 'title', value: title, level}))
	}

	const handleStatus = () => {
		const updatedStatus = task.status === 'done' ? 'in_progress' : 'done'

		dispatch(updateTask({code, taskId: task.id, field: 'status', value: updatedStatus, level: task.level}))
	}

	const handleDelete = async () => {
		const confirmed = await showAlert('task')
		if(confirmed) {
			dispatch(deleteTask({code, taskId: task.id}))
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
				<TaskMenu code={code} task={task} openTask={openTask} setOpenTask={setOpenTask} setInputSubTask={setInputSubTask} setIsOpenInput={setIsOpenInput} onDelete={handleDelete} />
				<input 
					type="checkbox" 
					name="status" 
					checked={task.status === "done"} 
					onChange={handleStatus} 
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
						onBlur={(e) => handleBlur2(e, task.id, task.level)} 
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
			<SubtaskInput code={code} task={task} inputSubTask={inputSubTask} isOpenInput={isOpenInput} setIsOpenInput={setIsOpenInput} />
		</div>
	)
}

export default ItemTask