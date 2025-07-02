import {EllipsisVertical, Trash2} from "lucide-react"
import Task from '@/types/Task'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '@/redux/store'
import {updateTask} from '@/redux/slices/checklistSlice'

export default function TaskMenu ({code, task, openTask, setOpenTask, setInputSubTask, setIsOpenInput, onDelete}: {code: string, task: Task, openTask: number | null, setOpenTask: React.Dispatch<React.SetStateAction<number | null>>, setInputSubTask: React.Dispatch<React.SetStateAction<number | null>>, setIsOpenInput: React.Dispatch<React.SetStateAction<boolean>>, onDelete: () => Promise<void>}) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const dispatch = useDispatch<AppDispatch>()

	const handleMenuTask = () => {
		console.info('clicked task menu')
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
		const newLevel = arrow === 'down' ? task.level + 1 : task.level - 1
		dispatch(updateTask({code, taskId: task.id, field: 'level', value: newLevel}))

		setIsOpen(false)
	}

	const changeType = () => {
		const newType = task.type === 'regular' ? 'daily' : 'regular'
		dispatch(updateTask({code, taskId: task.id, field: 'type', value: newType}))

		setIsOpen(false)
	}

	return (
		<div className="relative">
			<EllipsisVertical  
				color="blue" 
				className="bg-indigo-700 py-1 w-4 h-4 md:w-5 md:h-5 stroke-white border-2" 
				onClick={handleMenuTask} 
				onPointerDown={e => e.stopPropagation()}
				onTouchStart={() => {
					handleMenuTask()
				}}
			/>
			<ul className={`bg-red-700 text-sm w-32 z-40 border-2 text-white ${openTask === task.id && isOpen ? 'absolute' : 'hidden'} left-8 top-0 p-2 px-4`}>
				{task.level !== 3 && 
					<>
						<li 
							className="hover:text-indigo-400 border-b-2 border-dotted mb-1" 
							onPointerDown={e => e.stopPropagation()} 
							onTouchStart={() => showInputSubTask()}
							onClick={showInputSubTask}
						>
							add subtask
						</li>
						<li 
							className="hover:text-indigo-400 border-b-2 border-dotted mb-1"
							onPointerDown={e => e.stopPropagation()}
							onTouchStart={() => turnLevel('down')}
							onClick={() => turnLevel('down')}
						>
							&raquo; subtask
						</li>
					</>
				}
				<li 
					className={`hover:text-indigo-400 border-b-2 border-dotted mb-1 ${task.level === 1 ? 'hidden' : ''}`}
					onPointerDown={e => e.stopPropagation()}
					onTouchStart={() => turnLevel('up')}
					onClick={() => turnLevel('up')}
				>
					&laquo; unsubtask
				</li>
				<li 
					className="hover:text-indigo-400 border-b-2 border-dotted mb-1" 
					onPointerDown={e => e.stopPropagation()} 
					onTouchStart={() => changeType()}
					onClick={changeType}
				>
					{task.type === 'daily' ? 'cancel routine' : 'to be routine'}
				</li>
				<li 
					className="hover:text-indigo-400 border-b-2 border-dotted mb-1 md:hidden"
					onPointerDown={e => e.stopPropagation()}
					onTouchStart={async () => await onDelete()}
					onClick={async () => await onDelete()}
				>
					<Trash2 size={10} className="stroke-white inline-block" /> delete
				</li>
			</ul>
		</div>
	)
}