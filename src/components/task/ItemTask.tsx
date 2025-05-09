import Task from '@/types/Task'
import {Trash2, Move} from "lucide-react"
import {showAlert} from "@/libs/showAlert"
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {useState} from 'react'
import SubtaskInput from '@/components/elements/task/SubtaskInput'
import TaskMenu from '@/components/elements/task/TaskMenu'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {updateTask, deleteTask} from '@/redux/slices/checklistSlice'
import {useRouter} from 'next/navigation'

const ItemTask = ({
	task, 
	code,
	openTask,
	setOpenTask,
	inputSubTask,
	setInputSubTask,
	activePage
	}:{
		task: Task,
		code: string, 
		openTask: number | null,
		setOpenTask: React.Dispatch<React.SetStateAction<number | null>>,
		inputSubTask: number | null,
		setInputSubTask: React.Dispatch<React.SetStateAction<number | null>>,
		activePage: number
	}) => {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id})
	const [isOpenInput, setIsOpenInput] = useState<boolean>(false)
	const dispatch = useDispatch<AppDispatch>()
	const pagination = useSelector((state: RootState) => state.checklist.pagination)
	const tasks = useSelector((state: RootState) => state.checklist.tasks)
	const router = useRouter()

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		marginLeft: `${task.level * 40 - 40}px` 
	}

	const handleBlur2 = async (e: React.FocusEvent<Element>, taskId: number) => {
		const title = (e.currentTarget as HTMLElement).innerText

		await dispatch(updateTask({code, taskId, field: 'title', value: title}))
	}

	const handleStatus = async () => {
		const updatedStatus = task.status === 'done' ? 'in_progress' : 'done'

		const result = await dispatch(updateTask({code, taskId: task.id, field: 'status', value: updatedStatus}))

		if(result.payload.status && result.payload.statusCode === 200) {
			// CHECK HAVE CHILDRENS & CHENGE IF HAVE IN THE PARENT 
			if(task.level !== 3) {
				const followingSubTask = tasks.filter(t => t.order > task.order) 

				for(const t of followingSubTask) {
					if(t.level > task.level) {
						await dispatch(updateTask({code, taskId: t.id, field: 'status', value: updatedStatus}))
					} else {
						break
					}
				}
			}

			// CHECK PARENT & CHANGE IF ALL SIBLINGS WAS DONE IN THIS SUBTASK
			if(task.level > 1) {
				const potensialParents = tasks.filter(t => t.order < task.order && t.level === task.level -1)
				const parent = potensialParents.length > 0 ? potensialParents.reduce((prev, current) => prev.order > current.order ? prev : current) : null

				if(parent) {
					const nextParentOrEnd = tasks.find(t => t.level === parent.level && t.order > parent.order && t.order > task.order)?.order || Infinity

					const siblings = tasks.filter(t => t.level === task.level && t.order > parent.order && t.order < nextParentOrEnd && t.id !== task.id)

					const allSiblingsDone = siblings.every(s => s.status === "done")

					if(allSiblingsDone && updatedStatus === 'done') {
						dispatch(updateTask({code, taskId: parent.id, field: 'status', value: 'done'}))
					} else {
						dispatch(updateTask({code, taskId: parent.id, field: 'status', value: 'in_progress'}))
					}
				}
			}

		}
	}

	const handleDelete = async () => {
		const confirmed = await showAlert('task')
		if(confirmed) {
			const result = await dispatch(deleteTask({code, taskId: task.id, currentPage: pagination.currentPage}))

			const followingSubTask = tasks.filter(t => t.order > task.order)
			console.log({followingSubTask})

			// for delete all children in this parent
			for(const t of followingSubTask) {
				if(t.level > task.level) {
					await dispatch(deleteTask({code, taskId: t.id, currentPage: pagination.currentPage}))
				} else {
					break
				}
			}

			// redirect to before page if task empty for page else page 1
			if(result.payload.data && result.payload.data.length === 0 && activePage > 1) {
				router.push(`/checklist/${code}?page=${activePage - 1}`)
			}
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
					className="hidden md:inline-block hover:bg-yellow-300 group md:h-12" 
					onClick={async () => await handleDelete()}
					onPointerDown={e => e.stopPropagation()}
				>
					<Trash2 className="stroke-stone-700 group-hover:stroke-stone-600 w-3 md:w-5 h-3 md:h-5" />
				</button>
				<div className="hover:bg-stone-700 w-[20px] h-[20px] group md:h-12 flex items-center">
					<Move className="stroke-stone-700 group-hover:stroke-stone-100 w-3 md:w-5 h-3 md:h-5" style={{ touchAction: "none" }} />
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
						className={`text-blue-700 text-2xl md:text-5xl pt-0 md:pt-2 px-1 md:px-4 decoration-red-700 decoration-4 decoration-solid w-full ${task.status === "done" ? "line-through" : ""} font-loversQuarrel selection:bg-amber-200`} 
						contentEditable 
						suppressContentEditableWarning={true}
						onBlur={(e) => handleBlur2(e, task.id)} 
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