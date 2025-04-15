import {EllipsisVertical, Trash2} from "lucide-react"
import Task, {PaginationProps} from '@/types/Task'
import fetchTask from '@/services/task/QueryTask'
import {HttpMethod} from '@/types/HttpMethod'
import {useState} from 'react'

export default function TaskMenu ({code, task, setTasks, pagination, setPagination, openTask, setOpenTask, setInputSubTask, setIsOpenInput, onDelete}: {code: string, task: Task, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, pagination: PaginationProps, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>, openTask: number | null, setOpenTask: React.Dispatch<React.SetStateAction<number | null>>, setInputSubTask: React.Dispatch<React.SetStateAction<number | null>>, setIsOpenInput: React.Dispatch<React.SetStateAction<boolean>>, onDelete: () => Promise<void>}) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

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

	const turnLevel = async (arrow: string) => {
		await fetchTask({code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', taskId: task.id, name: 'level', value: task.level + (arrow === 'up' ? -1 : 1)})
		const updatedTasks = await fetchTask({code, currentPage: pagination.currentPage})

		setTasks(Array.isArray(updatedTasks!.data) ? updatedTasks!.data : [])
		if('pagination' in updatedTasks!) {
			setPagination(updatedTasks!.pagination)
		}

		setIsOpen(false)
	}

	return (
		<div className="relative">
			<EllipsisVertical  
				color="blue" 
				className="bg-amber-200 py-1 w-4 h-4 md:w-5 md:h-5" 
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
					className={`hover:text-blue-300 border-b-2 border-dotted mb-1 ${task.level === 1 ? 'hidden' : ''}`}
					onPointerDown={e => e.stopPropagation()}
					onClick={() => turnLevel('up')}
				>
					&lt; unsubtask
				</li>
				<li 
					className="hover:text-blue-300 border-b-2 border-dotted mb-1"
					onPointerDown={e => e.stopPropagation()}
					onClick={async () => await onDelete()}
				>
					<Trash2 size={10} className="stroke-white inline-block" /> delete
				</li>
			</ul>
		</div>
	)
}