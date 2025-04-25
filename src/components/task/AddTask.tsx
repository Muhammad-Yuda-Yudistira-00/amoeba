import {useState} from "react"
import {AppDispatch, RootState} from '@/redux/store'
import {useDispatch, useSelector} from 'react-redux'
import {addTask, getTasks} from '@/redux/slices/checklistSlice'
// import {unwrap} from '@reduxjs/toolkit'

export default function AddTask({code}: {code: string}) {
	const [task, setTask] = useState<string>("")
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<Error | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const loadingAddTask = useSelector((state: RootState) => state.checklist.loadingAddTask)
	// const errorAddTask = useSelector((state: RootState) => state.checklist.errorAddTask)
	const pagination = useSelector((state: RootState) => state.checklist.pagination)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask(e.currentTarget.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(!task.trim()) return

		setIsSuccess(false)

		try {
			await dispatch(addTask({code, title: task, level: 1})).unwrap()

			const estimatedTotal = pagination.totalItems + 1
			const newTotalPages = Math.ceil(estimatedTotal / pagination.perPage)
			await dispatch(getTasks({code, currentPage: newTotalPages}))

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
				<div className="flex items-center bg-yellow-300 px-4 py-2">
					<div className="mr-4 w-full">
						<input type="text" name="task" value={task} onChange={handleChange} placeholder="write your ide.." className="text-amber-700 px-2 rounded-l-2xl pl-4 text-stone-700 focus:outline-amber-400 h-6 w-full" />
					</div>
					<button className="px-3 py-1 md:px-4 md:py-2 ml-2 text-white bg-amber-700 text-xs md:text-sm hover:text-amber-300 rounded-2xl uppercase disabled:opacity-50 disabled:pointer-events-none" disabled={loadingAddTask}>{loadingAddTask ? 'loading..' : 'add'}</button>
				</div>
				<div className="opacity-75 text-center w-full bg-yellow-400 relative">
					{(isSuccess || error) && (
						<>
						<div className="absolute blcok -right-0 w-8 bg-stone-400 cursor-pointer hover:bg-black" onClick={() => {
							setIsSuccess(false)
							setError(null)
						}}>x</div>
						{isSuccess && (<small className="text-lime-700">*success add new task!</small>)}
						{error && (
							<small className="text-red-700">*{error.message}</small>
						)}
						</>
					)}
				</div>
			</form>
		)
}