import {useState} from 'react'
import {CircleX} from "lucide-react"
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {addTask} from '@/redux/slices/checklistSlice'
import Task from '@/types/Task'
import {useRouter} from 'next/navigation'

export default function SubtaskInput({code,task,inputSubTask,isOpenInput,setIsOpenInput}:{code:string,task:Task,inputSubTask:number|null,isOpenInput:boolean,setIsOpenInput:React.Dispatch<React.SetStateAction<boolean>>}) {
	const [subTask, setSubTask] = useState<string>("")
	const dispatch = useDispatch<AppDispatch>()
	const pagination = useSelector((state: RootState) => state.checklist.pagination)
	const loading = useSelector((state: RootState) => state.checklist.loading)
	const tasks = useSelector((state: RootState) => state.checklist.tasks)
	const router = useRouter()

	const subTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubTask(e.currentTarget.value)
	}

	const addSubTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(!subTask) return

		const followingTasks = tasks.filter(t => t.order > task.order)

		let insertAfterOrder = task.order

		for(const t of followingTasks) {
			if(t.level > task.level) {
				insertAfterOrder = Math.max(insertAfterOrder, t.order)
			} else {
				break
			}
		}

		const newOrder = insertAfterOrder + 1
		const newTotalPages = Math.ceil(newOrder / pagination.perPage)

		await dispatch(addTask({code, title: subTask, level: task.level === 2 ? 3 : 2, order: newOrder, currentPage: pagination.currentPage}))

		if(!loading) {
			setSubTask('')
			setIsOpenInput(false)
		}

		if(tasks.length === pagination.perPage && pagination.currentPage !== newTotalPages) {
			router.push(`/checklist/${code}?page=${newTotalPages}`)
		}
	}

	return (
		<form action="" method="POST" onSubmit={(e) => addSubTask(e)} className={`text-stone-700 pt-2 flex justify-end md:justify-start w-full gap-1 md:gap-2 ${inputSubTask === task.id && isOpenInput? 'block' : 'hidden'}`}>
			<input 
					type="text" 
					value={subTask}
					placeholder="add new sub-task.." 
					className="bg-stone-700 focus:outline-white w-[70%] md:w-[80%] px-2 text-white font-bold border-white shadow-white text-xs md:text-sm" 
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
				className="hover:text-red-700 hover:fill-stone-700 hover:stroke-black fill-black stroke-white w-5 h-5 md:w-6 md:h-6"
				onPointerDown={e => e.stopPropagation()}
				onTouchStart={() => setIsOpenInput(prev => !prev)}
				onClick={() => {
					setIsOpenInput(prev => !prev)
				}}
			/>
			<button disabled={loading} className={`bg-stone-700 px-2 md:px-3 text-white uppercase font-semibold text-xs md:text-sm hover:bg-black hover:text-stone-300`}>{loading? 'Loading..' : 'Add'}</button>
		</form>	
	)
}