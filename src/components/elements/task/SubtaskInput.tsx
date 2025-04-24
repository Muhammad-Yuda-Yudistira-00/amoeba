import {useState} from 'react'
import {CircleX} from "lucide-react"
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {addTask, getTasks, updateOrderTask} from '@/redux/slices/checklistSlice'
import Task from '@/types/Task'

export default function SubtaskInput({code,task,inputSubTask,isOpenInput,setIsOpenInput}:{code:string,task:Task,inputSubTask:number|null,isOpenInput:boolean,setIsOpenInput:React.Dispatch<React.SetStateAction<boolean>>}) {
	const [subTask, setSubTask] = useState<string>("")
	const dispatch = useDispatch<AppDispatch>()
	const pagination = useSelector((state: RootState) => state.checklist.pagination)
	const loading = useSelector((state: RootState) => state.checklist.loading)

	const subTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubTask(e.currentTarget.value)
	}

	const addSubTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(!subTask) return

		const newOrder = task.order + 1
		const newTotalPages = Math.ceil(newOrder / pagination.perPage)

		const newTask = await dispatch(addTask({code, title: subTask, level: task.level === 2 ? 3 : 2, order: newOrder}))
		console.log("new task: ", newTask.payload.data)
		const id = newTask.payload.data.id
		await dispatch(updateOrderTask({code, taskId: id, order: task.order + 1, level: task.level + 1}))
		await dispatch(getTasks({code, currentPage: newTotalPages}))

		if(!loading) {
			setSubTask('')
			setIsOpenInput(false)
		}
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
			<button disabled={loading} className={`bg-amber-200 px-3 border-2 border-red-700 uppercase font-semibold text-sm hover:bg-red-700 hover:text-stone-300`}>{loading? 'Loading..' : 'Add'}</button>
		</form>	
	)
}