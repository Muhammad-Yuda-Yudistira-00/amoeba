import ItemTask from '@/components/task/ItemTask'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {getTasks} from '@/redux/slices/checklistSlice'
import {startSnowConfetti} from '@/libs/canvas-confetti-js/snow'

export default function ListTask({code, activePage}: {code:string, activePage: number}) {
	const [openTask, setOpenTask] = useState<number | null>(null)
	const [inputSubTask, setInputSubTask] = useState<number | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const tasks = useSelector((state: RootState) => state.checklist.tasks)
	const loadingTasks = useSelector((state: RootState) => state.checklist.loadingTasks)
	const pagination = useSelector((state: RootState) => state.checklist.pagination)

	useEffect(() => {
		const stopConfetti = startSnowConfetti()
		dispatch(getTasks({code, currentPage: activePage}))

		return () => {
			stopConfetti()
		}
	}, [code, dispatch, activePage])

	if(!loadingTasks && pagination.totalItems > 0) {
		return (
			<>
			<ul className="px-0">
				<SortableContext items={tasks} strategy={verticalListSortingStrategy} >
					{tasks && tasks.map(task => (
							<ItemTask key={task.id} task={task} code={code} openTask={openTask} setOpenTask={setOpenTask} inputSubTask={inputSubTask} setInputSubTask={setInputSubTask} activePage={activePage} />
					))}
				</SortableContext>
			</ul>
			</>
			)
	} else if(!loadingTasks && pagination.totalItems === 0) {
		return (
			<h1 className="capitalize text-center w-full font-loversQuarrel text-white pt-6 text-4xl md:text-5xl">task empty</h1>
			)
	}
}