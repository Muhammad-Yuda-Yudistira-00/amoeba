"use client"

import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import ListTask from "@/components/task/ListTask"
import AddTask from "@/components/task/AddTask"
import Task, {PaginationProps} from "@/types/Task"
import Footer from "@/components/elements/Footer"
import Donation from "@/components/elements/Donation"
import Pagination from "@/components/elements/Pagination"
import ChecklistHeader from "@/components/elements/ChecklistHeader"
import ChecklistDelete from "@/components/elements/checklist/ChecklistDelete"
import fetchTask from "@/services/task/QueryTask"
import {DndContext, closestCorners, DragEndEvent} from "@dnd-kit/core"
import {arrayMove} from '@dnd-kit/sortable'
import {HttpMethod} from '@/types/HttpMethod'

export default function ChecklistClient({code, activePage}: {code: string, activePage?: number}){
	const [tasks, setTasks] = useState<Task[]>([])
	const [pagination, setPagination] = useState<PaginationProps>({
		currentPage: activePage ?? 1,
		perPage: 10,
		totalPages: 1,
		totalItems: 10
	})
	const {push} = useRouter()

	useEffect(() => {
		if(pagination.currentPage > 1 && tasks.length === 0) {
			setPagination({...pagination, currentPage: pagination.currentPage - 1})
			push(`/checklist/${code}?page=${pagination.currentPage - 1}`)
		}
	}, [tasks.length, pagination])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchTask({code, currentPage: activePage})
				if(result) {
					setTasks(Array.isArray(result.data) ? [...result.data] : [result.data])
					if("pagination" in result) {
						setPagination(result.pagination)
					}
				} 
			} catch(error) {
				console.error('Failed get tasks: ' + error)
			}
		}

		fetchData()
	}, [code, activePage])

	const getTaskPos = (id: number): number => tasks.findIndex(task => task.id === id)

	const handleDragEnd = async (event: DragEndEvent) => {
		const {active, over} = event

		if(!over || active.id === over.id) return

		const originalPos = getTaskPos(Number(active.id))
		const newPos = getTaskPos(Number(over.id))

			setTasks(tasks => {
				return arrayMove(tasks, originalPos, newPos)
			})

		const response = await fetchTask({code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', taskId: Number(active.id), name: 'order', value: newPos + 1 })

		if(response) console.log('Success update task order.')
	}

	return (
		<div className="flex flex-row-reverse w-screen h-full justify-between md:justify-end mb-12">
			<div className="text-center py-4 flex flex-col items-center border-x-2 bg-stone-700 md:bg-stone-700 w-auto">
				<span className="[writing-mode:vertical-rl] border-b-2 pb-8">
					<h3 className="text-xs md:text-lg text-stone-300">Pagination</h3>
				</span>
				<div>
					{pagination && (<Pagination pagination={pagination} code={code} />)}
				</div>
			</div>
			<div className="flex flex-col w-full items-center min-h-screen bg-orange-300 py-2 pt-4 px-0 md:px-8 md:w-4/5 py-10 bg-[url('/themes/background/city-3.jpg')] bg-cover bg-bottom bg-blend-screen">
				<div className="flex flex-col justify-around md:justify-between items-center h-full px-2">
					<div className="flex flex-col items-center gap-3">
						<ChecklistHeader code={code} />
						<div className="w-full">
							<DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
								<ListTask code={code} tasks={tasks} setTasks={setTasks} pagination={pagination} setPagination={setPagination} />
							</DndContext>
						</div>
						<div className="pt-8">
							<AddTask code={code} pagination={pagination} setTasks={setTasks} setPagination={setPagination} />
						</div>
						<div>
							<ChecklistDelete code={code} />
							<Donation />
						</div>
					</div>
					<div className="h-2/12 text-center md:min-w-96 w-[90%] md:w-2/3 bg-gradient-to-r from-white/10 via-amber-200 to-stone-700 mt-0 md:mt-4 mb-8 border-2 shadow-2xl">
						<Footer code={code} />
					</div>
				</div>
			</div>
		</div>
		)
}