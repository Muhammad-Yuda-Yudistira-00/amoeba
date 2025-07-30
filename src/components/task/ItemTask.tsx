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
	const isMobile = window.innerWidth <= 768
	const [isHover, setIsHover] = useState(false);

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		marginLeft: isMobile ? `${task.level * 15 - 40}px` : `${task.level * 40 - 40}px`
	}



	const getColor = (level: number) => {
	  switch (level) {
	    case 1:
	      return "#83a1e8";
	    case 2:
	      return "#cecdcd";
	    case 3:
	      return "#fff";
	    default:
	      return "#fff";
	  }
	};

	const getGradientColor = (level: number, isHover: boolean) => {
	  const color = getColor(level);
	  const lastColor = isHover ? "red" : color;
	  return `linear-gradient(to right, ${color}, ${color}, ${lastColor})`;
	};

	const styleLevel = {
	  background: getGradientColor(task.level, false),
	}

	const styleLevelHover = {
	  background: getGradientColor(task.level, true),
	}



	const hasSubtask = (taskId: number): boolean => {
		const currentTask = tasks.find(task => task.id === taskId)

		if(!currentTask) return false

		const currentIndex = tasks.findIndex(task => task.id === taskId)

		for(let i = currentIndex + 1; i < tasks.length; i++) {
			if(tasks[i].level <= currentTask.level) break
			if(tasks[i].level > currentTask.level) return true
		}

		return false
	}

	const isTaskWithSubtask = task.level === 1 && hasSubtask(task.id)


	const handleBlur2 = async (e: React.FocusEvent<Element>, taskId: number) => {
		const title = (e.currentTarget as HTMLElement).innerText

		await dispatch(updateTask({code, taskId, field: 'title', value: title}))
	}

	const handleStatus = async () => {
		const updatedStatus = task.status === 'done' ? 'in_progress' : 'done'

		const result = await dispatch(updateTask({code, taskId: task.id, field: 'status', value: updatedStatus, currentPage: pagination.currentPage}))

		if(result.payload.status && result.payload.statusCode === 200) {
			// CHECK HAVE CHILDRENS & CHENGE IF HAVE IN THE PARENT 
			if(task.level !== 3) {
				const followingSubTask = tasks.filter(t => t.order > task.order) 

				for(const t of followingSubTask) {
					if(t.level > task.level) {
						await dispatch(updateTask({code, taskId: t.id, field: 'status', value: updatedStatus, currentPage: pagination.currentPage}))
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
						dispatch(updateTask({code, taskId: parent.id, field: 'status', value: 'done', currentPage: pagination.currentPage}))
					} else {
						dispatch(updateTask({code, taskId: parent.id, field: 'status', value: 'in_progress', currentPage: pagination.currentPage}))
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
			className={`flex flex-col justify-between items-start w-full px-2 md:px-0 md:py-0`}
			ref={setNodeRef} 
			{...attributes} 
			{...listeners}
			style={style}
		>
			<div className={`flex gap-1 md:gap-2 items-center justify-start w-[100%] md:w-[92%] pl-3 md:pl-0`}>
				<button 
					type="button" 
					className="hidden md:inline-block hover:bg-white group md:h-12" 
					onClick={async () => await handleDelete()}
					onPointerDown={e => e.stopPropagation()}
				>
					<Trash2 className="stroke-black fill-orange-600 group-hover:stroke-black w-3 md:w-5 h-3 md:h-5" />
				</button>
				<div className="hover:bg-stone-700 w-[20px] h-[20px] group md:h-12 flex items-center">
					<Move className="stroke-indigo-700 fill-black group-hover:stroke-stone-100 w-3 md:w-5 h-3 md:h-5" style={{ touchAction: "none" }} />
				</div>
				<TaskMenu code={code} task={task} openTask={openTask} setOpenTask={setOpenTask} setInputSubTask={setInputSubTask} setIsOpenInput={setIsOpenInput} onDelete={handleDelete} />
				<input 
					type="checkbox" 
					name="status" 
					checked={task.status === "done"} 
					onChange={handleStatus} 
					onPointerDown={e => {
						e.stopPropagation()
						e.preventDefault()
					}}
					onTouchStart={() => {
						handleStatus()
					}}
					className="accent-stone-700 w-5 h-5 md:w-5 md:h-5" 
				/>
				<div
					className={`w-full md:min-w-96 ${isTaskWithSubtask && task.level === 1 ? 'bg-neutral-400' : 'bg-green-400'} border-black border-2 flex items-center leading-7`}
				>
					<li 
						data-key={task.id} 
						className={`py-0 md:py-1 pl-1 md:pl-4 w-full h-full flex justify-between items-center gap-4`} 
						style = {isHover ? styleLevelHover : styleLevel}
						onMouseOver={() => setIsHover(true)}
  						onMouseOut={() => setIsHover(false)}
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
							<p className={`text-xs md:text-sm font-medium tracking-wider decoration-red-700 decoration-2 decoration-wavy text-black ${task.status === "done" ? "line-through" : ""}`}>
								{task.title}
							</p>
							{task.type === 'daily' && (
								<span className="bg-yellow-100 text-black text-xs font-light md:font-medium me-0 md:me-2 px-1 md:px-2.5 py-0 md:py-0.5 rounded-l-full md:rounded-full dark:bg-yellow-200 md:dark:bg-yellow-400 dark:text-black border-0 md:border-2 border-black">routine</span>
							)}
					</li>
				</div>
			</div>
			<SubtaskInput code={code} task={task} inputSubTask={inputSubTask} isOpenInput={isOpenInput} setIsOpenInput={setIsOpenInput} />
		</div>
	)
}

export default ItemTask