import Task, {PaginationProps} from "@/types/Task"
import fetchTask from "@/services/task/QueryTask"
import {HttpMethod} from "@/types/HttpMethod"
import ItemTask from '@/components/task/ItemTask'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '@/redux/store'
import {getTasks, updateTask} from '@/redux/slices/checklistSlice'

export default function ListTask({code, tasks, setTasks, pagination, setPagination, activePage}: {code:string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>, pagination: PaginationProps, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>, activePage: number}) {
	const [openTask, setOpenTask] = useState<number | null>(null)
	const [inputSubTask, setInputSubTask] = useState<number | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const tasksRedux = useSelector((state: RootState) => state.checklist.tasks)
	const loading = useSelector((state: RootState) => state.checklist.loading)
	const error = useSelector((state: RootState) => state.checklist.error)

	useEffect(() => {
		dispatch(getTasks(code, activePage))
	}, [code,dispatch])

	if(pagination.totalItems > 0) {
		return (
			<ul className="px-0">
				<SortableContext items={tasksRedux} strategy={verticalListSortingStrategy} >
					{tasksRedux && tasksRedux.map(task => (
							<ItemTask key={task.id} task={task} code={code} setTasks={setTasks} pagination={pagination} setPagination={setPagination} openTask={openTask} setOpenTask={setOpenTask} inputSubTask={inputSubTask} setInputSubTask={setInputSubTask} />
					))}
				</SortableContext>
			</ul>
			)
	} else {
		return (
			<h1 className="capitalize text-center w-full font-loversQuarrel text-black text-5xl">task empty</h1>
			)
	}
}