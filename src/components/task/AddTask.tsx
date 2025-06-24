import {useState} from "react"
import {AppDispatch, RootState} from '@/redux/store'
import {useDispatch, useSelector} from 'react-redux'
import {addTask} from '@/redux/slices/checklistSlice'
import {useRouter} from 'next/navigation'

export default function AddTask({code}: {code: string}) {
	const [task, setTask] = useState<string>("")
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<Error | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const loadingAddTask = useSelector((state: RootState) => state.checklist.loadingAddTask)
	const pagination = useSelector((state: RootState) => state.checklist.pagination)
	const router = useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask(e.currentTarget.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(!task.trim()) return

		setIsSuccess(false)

		try {
			const result = await dispatch(addTask({code, title: task, level: 1, currentPage: pagination.currentPage}))

			if(pagination.currentPage !== result.payload.pagination.totalPages) {
				router.push(`/checklist/${code}?page=${result.payload.pagination.totalPages}`)
			}

			setTask('')
			setIsSuccess(true)
			setError(null)
			setTimeout(() => setIsSuccess(false), 3000)
		} catch(error) {
			setError(error as Error)
			setIsSuccess(false)

		}
	}

	return (
			<form onSubmit={handleSubmit}>
				<div className="flex items-center bg-neutral-400 px-4 py-2">
					<div className="md:mr-4 w-full">
						<input type="text" name="task" value={task} onChange={handleChange} placeholder="write your ide.." className="px-2 font-bold text-sm pl-4 text-green-700 focus:outline-green-600 focus:ring-green-600 focus:border-green-600 h-5 md:h-6 w-full bg-white" />
					</div>
					<button className="px-3 py-1 md:px-4 ml-2 text-white bg-green-700 text-xs md:text-sm rounded-lg uppercase disabled:opacity-50 disabled:pointer-events-none" disabled={loadingAddTask}>{loadingAddTask ? 'loading..' : 'add'}</button>
				</div>
				<div className={`text-center w-full ${error && error.message ? 'bg-red-700' : 'bg-lime-600'} relative`}>
					{(isSuccess || error) && (
						<>
						<div className="absolute blcok -right-0 w-8 bg-stone-700 cursor-pointer hover:bg-stone-900" onClick={() => {
							setIsSuccess(false)
							setError(null)
						}}>x</div>
						{isSuccess && (<small className="text-white">*success add new task!</small>)}
						{error && (
							<small className="text-white tracking-wide font-bold">*{error.message}</small>
						)}
						</>
					)}
				</div>
			</form>
		)
}