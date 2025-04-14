import Task, {PaginationProps} from '@/types/Task'
import fetchTask from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'
import {Trash2, Move, EllipsisVertical, CircleX} from "lucide-react"
import {showAlert} from "@/libs/showAlert"
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {useState} from 'react'


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
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isOpenInput, setIsOpenInput] = useState<boolean>(false)
	const [subTask, setSubTask] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		marginLeft: `${task.level * 40 - 40}px` 
	}

	const handleMenuTask = () => {
		setOpenTask(task.id)
		setIsOpen(isOpen => !isOpen)
	}

	const showInputSubTask = () => {
		setInputSubTask(task.id)
		// buka input sub task
		setIsOpenInput(isOpenInput => !isOpenInput)
		// tutup menu task
		setIsOpen(isOpen => !isOpen)
	}

	const subTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubTask(e.currentTarget.value)
	}

	const addSubTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(!subTask) return

		setIsLoading(true)

		await fetchTask({code, method: HttpMethod.POST, contentType: 'application/x-www-form-urlencoded', name: 'title', value: subTask, currentPage: pagination.currentPage, level: task.level === 2 ? 3 : 2, order: task.order + 1})
		const updatedTasks = await fetchTask({code, currentPage: pagination.currentPage})

		setTasks(Array.isArray(updatedTasks!.data) ? updatedTasks!.data : [])
		if('pagination' in updatedTasks!) {
			setPagination(updatedTasks!.pagination)
		}

		setSubTask('')
		setIsLoading(false)
		setIsOpenInput(false)
	}

	const turnLevel = async (arrow: string) => {
		await fetchTask({code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', taskId: task.id, name: 'level', value: task.level + (arrow === 'up' ? -1 : 1)})
		const updatedTasks = await fetchTask({code, currentPage: pagination.currentPage})

		setTasks(Array.isArray(updatedTasks!.data) ? updatedTasks!.data : [])
		if('pagination' in updatedTasks!) {
			setPagination(updatedTasks!.pagination)
		}

		setIsOpen(false)
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
			className={`flex flex-col justify-between w-full`}
			ref={setNodeRef} 
			{...attributes} 
			{...listeners}
			style={style}
		>
			<div className={`flex gap-4 items-center border-b-2 border-stone-400 w-full`}>
				<button 
					type="button" 
					className="hover:bg-amber-200 group h-12" 
					onClick={async () => await handleDelete()}
					onPointerDown={e => e.stopPropagation()}
				>
					<Trash2 size={20} className="stroke-stone-700 group-hover:stroke-stone-600" />
				</button>
				<div className="hover:bg-stone-700 w-[20px] h-[20px] group">
					<Move size={20} className="stroke-stone-700 group-hover:stroke-stone-100" />
				</div>
				<div className="relative">
					<EllipsisVertical 
						size={25} 
						color="blue" 
						className="bg-amber-200 py-1" 
						onClick={handleMenuTask} 
						onPointerDown={e => e.stopPropagation()}
					/>
					<ul className={`bg-stone-600 text-sm w-32 z-40 ${openTask === task.id && isOpen ? 'absolute' : 'hidden'} left-12 top-0 p-2 px-4 opacity-80`}>
						{task.level !== 3 && 
							<>
								<li 
									className="hover:text-blue-300 border-b-2 border-dotted mb-1" 
									onPointerDown={e => e.stopPropagation()} 
									onClick={showInputSubTask}
								>
									+ new subtask
								</li>
								<li 
									className="hover:text-blue-300 border-b-2 border-dotted mb-1"
									onPointerDown={e => e.stopPropagation()}
									onClick={() => turnLevel('down')}
								>
									&gt; subtask
								</li>
							</>
						}
						<li 
							className="hover:text-blue-300 border-b-2 border-dotted mb-1"
							onPointerDown={e => e.stopPropagation()}
							onClick={() => turnLevel('up')}
						>
							&lt; unsubtask
						</li>
					</ul>
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
						className={`text-blue-700 text-3xl md:text-5xl pt-2 px-4 decoration-amber-300 decoration-4 decoration-wavy w-full ${task.status === "done" ? "line-through" : ""} font-loversQuarrel selection:bg-amber-200`} 
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
			<form action="" method="POST" onSubmit={(e) => addSubTask(e)} className={`text-stone-700 pt-2 flex justify-between gap-2 ${inputSubTask === task.id && isOpenInput? 'block' : 'hidden'}`}>
				<input 
						type="text" 
						value={subTask}
						placeholder="add new sub-task.." 
						className="bg-amber-200 focus:outline-red-700 w-[85%] px-2" 
						onChange={(e) => subTaskTitle(e)} 
						onPointerDown={e => e.stopPropagation()} 
						onKeyDown={(e) => {
							if(e.key === " ") {
								e.preventDefault()
								document.execCommand("insertText", false, " ")
							}
							if(e.key === 'Enter') {
								e.preventDefault()
								const form = e.currentTarget.closest('form') as HTMLFormElement | null
								if(form) {
									form.requestSubmit()
								}
							}
						}}
				/>
				<CircleX 
					size={25}
					className="hover:text-red-700" 
					onPointerDown={e => e.stopPropagation()}
					onClick={() => {
						setIsOpenInput(prev => !prev)
					}}
				/>
				<button className={`bg-amber-200 px-3 border-2 border-red-700 uppercase font-semibold text-sm hover:bg-red-700 hover:text-stone-300`}>{isLoading? 'Loading..' : 'Add'}</button>
			</form>	
		</div>
	)
}

export default ItemTask