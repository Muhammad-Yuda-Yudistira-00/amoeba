import ItemTask from '@/components/task/ItemTask'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {getTasks} from '@/redux/slices/checklistSlice'

export default function ListTask({code, activePage}: {code:string, activePage: number}) {
	const [openTask, setOpenTask] = useState<number | null>(null)
	const [inputSubTask, setInputSubTask] = useState<number | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const tasksRedux = useSelector((state: RootState) => state.checklist.tasks)
	const paginationRedux = useSelector((state: RootState) => state.checklist.pagination)

	useEffect(() => {
			dispatch(getTasks({code, currentPage: activePage}))
	}, [code, dispatch, activePage])

	if(paginationRedux.totalItems > 0) {
		return (
			<ul className="px-0">
				<SortableContext items={tasksRedux} strategy={verticalListSortingStrategy} >
					{tasksRedux && tasksRedux.map(task => (
							<ItemTask key={task.id} task={task} code={code} openTask={openTask} setOpenTask={setOpenTask} inputSubTask={inputSubTask} setInputSubTask={setInputSubTask} />
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