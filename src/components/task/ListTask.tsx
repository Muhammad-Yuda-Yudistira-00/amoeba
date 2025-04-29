import ItemTask from '@/components/task/ItemTask'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {getTasks, updateOrderTask} from '@/redux/slices/checklistSlice'

export default function ListTask({code, activePage}: {code:string, activePage: number}) {
	const [openTask, setOpenTask] = useState<number | null>(null)
	const [inputSubTask, setInputSubTask] = useState<number | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const tasks = useSelector((state: RootState) => state.checklist.tasks)
	const loading = useSelector((state: RootState) => state.checklist.loading)
	const pagination = useSelector((state: RootState) => state.checklist.pagination)

	useEffect(() => {
			dispatch(getTasks({code, currentPage: activePage}))
	}, [code, dispatch, activePage])

	if(loading) {
		return <h1 className="capitalize text-center w-full font-loversQuarrel text-black text-5xl">Loading..</h1>
	}

	if(!loading && pagination.totalItems > 0) {
		return (
			<>
			<ul className="px-0">
				<SortableContext items={tasks} strategy={verticalListSortingStrategy} >
					{tasks && tasks.map(task => (
							<ItemTask key={task.id} task={task} code={code} openTask={openTask} setOpenTask={setOpenTask} inputSubTask={inputSubTask} setInputSubTask={setInputSubTask} />
					))}
				</SortableContext>
			</ul>
			</>
			)
	} else {
		return (
			<h1 className="capitalize text-center w-full font-loversQuarrel text-black text-5xl">task empty</h1>
			)
	}
}