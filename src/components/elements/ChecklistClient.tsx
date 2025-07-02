"use client"

import ListTask from "@/components/task/ListTask"
import AddTask from "@/components/task/AddTask"
import Footer from "@/components/elements/Footer"
import Donation from "@/components/elements/Donation"
import Pagination from "@/components/elements/Pagination"
import ChecklistHeader from "@/components/elements/ChecklistHeader"
import ChecklistDelete from "@/components/elements/checklist/ChecklistDelete"
import {DndContext, closestCorners, DragEndEvent, useSensors, useSensor, TouchSensor, KeyboardSensor, PointerSensor} from "@dnd-kit/core"
import {sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/redux/store'
import {updateOrderTask, getTasks} from '@/redux/slices/checklistSlice'
import {useEffect} from 'react'
import Link from 'next/link'

export default function ChecklistClient({code, activePage = 1}: {code: string, activePage?: number}){
	const dispatch = useDispatch<AppDispatch>()
	const tasks = useSelector((state: RootState) => state.checklist.tasks)
	const pagination = useSelector((state: RootState) => state.checklist.pagination)
	const meta = useSelector((state: RootState) => state.checklist.meta)

	useEffect(() => {
		dispatch(getTasks({code, currentPage: activePage}))
	}, [code, activePage, dispatch])

	const handleDragEnd = async (event: DragEndEvent) => {
		const {active, over} = event

		if(!over || active.id === over.id) return

		const movedTask = tasks.find(task => task.id === active.id)
		const targetTask = tasks.find(task => task.id === over.id)
		if(!movedTask || !targetTask) return

		dispatch({
			type: updateOrderTask.fulfilled.type,
			payload: {
				data: { id: movedTask.id, order: targetTask.order },
			}
		})

		try{
			await dispatch(updateOrderTask({code, taskId: Number(movedTask.id), order: targetTask.order}))
			// Check apakah dia punya children
			// ubah ordernya berurutan
		} catch(error) {
			console.error(error)
			await dispatch(getTasks({code, currentPage: pagination.currentPage}))
		}
	}

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	return (
		<div className="flex flex-row-reverse w-screen h-full justify-between md:justify-end mb-12">
			<div className="text-center py-4 flex flex-col items-center border-x-2 bg-indigo-700 w-auto selection:bg-orange-600">
				<span className="[writing-mode:vertical-rl] border-b-2 pb-8">
					<h3 className="text-xs md:text-lg text-stone-300">Pagination</h3>
				</span>
				<div className="w-full">
					<Pagination code={code} />
				</div>
			</div>
			<div className="flex flex-col w-full items-center min-h-screen bg-stone-700  pb-2 px-0 md:px-4 md:w-4/5 bg-fixed bg-no-repeat bg-[url('/themes/background/background.jpg')] relative">
				<span className="md:absolute mb-4 md:mb-0 top-2 right-6 text-indigo-800 bg-white/40 px-2 font-light text-xs self-end">
					Image by <a href="https://pixabay.com/id/users/michelle_pitzel-165491/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4011900" target="_blank" className="text-black hover:text-indigo-700">Michelle Pitzel</a> from <a href="https://pixabay.com/id//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4011900" target="_blank" className="hover:text-green-700">Pixabay</a>
				</span>
				<div className="flex flex-col justify-around md:justify-between items-center w-full px-2 min-h-40">
					<div className="flex flex-col md:items-center gap-2 md:gap-3">
						<ChecklistHeader code={code} />
						<small className="bg-white px-1 py-1 text-stone-700 font-light text-xs md:text-sm rounded text-base w-fit m-auto min-w-16 md:min-w-24 text-center">
							{meta.totalDone} / {pagination ? pagination.totalItems : '0'} ({pagination?.totalItems ? Math.round((meta.totalDone /pagination.totalItems) * 100) : 0}%)
						</small>
						<div className="box-border">
							<DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors} >
								<ListTask code={code} activePage={activePage} />
							</DndContext>
						</div>
						<div className="md:pt-8 pt-4">
							<AddTask code={code} />
						</div>
						<div>
							<ChecklistDelete code={code} />
							<Donation />
						</div>
					</div>
					<div className="h-2/12 text-center md:min-w-96 w-[90%] md:w-2/3 bg-gradient-to-r from-white/10 via-black/40 to-white/10 mt-4 md:mt-4 mb-8 border-2 border-white shadow-2xl shadow-amber-200">
						<Footer code={code} />
					</div>
					<div>
						<p className="text-orange-900 bg-stone-300 px-2">Created by <a href="https://my-profile-ten-kohl.vercel.app/" target="_blank" className="hover:text-stone-700 hover:underline font-bold text-sm">Zombie x Human</a>, <a href="https://github.com/titik444" target="_blank" className="hover:text-stone-700 hover:underline font-bold text-sm">Titik</a> in 2025</p>
					</div>
				</div>
				{/*<Link href="#">Credit</Link>*/}
				<Link href="/credit" className="pt-4 uppercase text-white hover:text-neutral-200 hover:underline decoration-[red] decoration-2">Credit</Link>
			</div>
		</div>
	)
}