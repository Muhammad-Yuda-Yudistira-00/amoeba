import {useState} from 'react'
import Task from '@/types/Task'
import {HttpMethod} from '@/types/HttpMethod'
import fetchTask, {PaginationProps} from '@/services/task/QueryTask'
import {CircleX} from "lucide-react"

export default function SubtaskInput({code,task,inputSubTask,setTasks,pagination,setPagination,isOpenInput,setIsOpenInput}:{code:string,task:Task,inputSubTask:number|null,setTasks:React.Dispatch<React.SetStateAction<Task[]>>,pagination:PaginationProps,setPagination:React.Dispatch<React.SetStateAction<PaginationProps>>,isOpenInput:boolean,setIsOpenInput:React.Dispatch<React.SetStateAction<boolean>>}) {
	const [subTask, setSubTask] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)

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

	return (
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
	)
}