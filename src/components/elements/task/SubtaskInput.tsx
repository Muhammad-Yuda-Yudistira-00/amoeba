import {useState} from 'react'
import {HttpMethod} from '@/types/HttpMethod'
import fetchTask from '@/services/task/QueryTask'
import {CircleX} from "lucide-react"
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '@/redux/store'
import {addTask} from '@/redux/slices/checklistSlice'

export default function SubtaskInput({code,task,inputSubTask,isOpenInput,setIsOpenInput}:{code:string,task:Task,inputSubTask:number|null,isOpenInput:boolean,setIsOpenInput:React.Dispatch<React.SetStateAction<boolean>>}) {
	const [subTask, setSubTask] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const dispatch = useDispatch<AppDispatch>()

	const subTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubTask(e.currentTarget.value)
	}

	const addSubTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(!subTask) return

		setIsLoading(true)

		dispatch(addTask({code, title: subTask, level: task.level === 2 ? 3 : 2, order: task.order + 1}))

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