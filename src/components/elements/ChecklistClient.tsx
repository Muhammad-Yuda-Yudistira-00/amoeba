"use client"

import {useState, useEffect} from "react"
import ListTask from "@/components/task/ListTask"
import AddTask from "@/components/task/AddTask"
import Task, {PaginationProps} from "@/types/Task"
import {DndContext, closestCorners, PointerSensor, TouchSensor, KeyboardSensor, useSensors, useSensor} from "@dnd-kit/core"
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable"
import handleDragEnd from "@/libs/@dnd-kit/handleDragEnd"
import Footer from "@/components/elements/Footer"
import Donation from "@/components/elements/Donation"
import Pagination from "@/components/elements/Pagination"
import ChecklistHeader from "@/components/elements/ChecklistHeader"
import Checklist from "@/types/Checklist"
import ChecklistDelete from "@/components/elements/checklist/ChecklistDelete"

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function ChecklistClient({initialData, code, activePage}: {initialData: Checklist, code: string, activePage?: number}){
	const [tasks, setTasks] = useState<Task[]>([])
	const [pagination, setPagination] = useState<PaginationProps>({
		currentPage: activePage || 1,
	    perPage: 10,
	    totalPages: 1,
	    totalItems: tasks.length || 0
	})
	const [checklist, setChecklist] = useState<Checklist | null>(initialData)

	activePage = activePage ? activePage : 1

	useEffect(() => {
		fetch(`${apiweb}/checklist/${code}/task?page=${activePage}`,{
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apikey ?? ""
			}	
		})
		.then(res => res.json())
		.then(data => {
			setTasks([...data.data])
			setPagination(data.pagination)
		})
		.catch(err => console.error("Failed to get all task: ", err))
	}, [code,activePage])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	return (
		<div className="flex flex-row-reverse w-screen justify-end bg-yellow-900">
			<div className="text-center py-4 flex flex-col items-center border-x-2">
				<span className="[writing-mode:vertical-rl] border-b-2 pb-8">
					<h3 className="text-lg text-stone-300">Pagination</h3>
				</span>
				<div>
					{pagination && (<Pagination pagination={pagination} code={code} />)}
				</div>
			</div>
			<div className="flex flex-col items-center min-h-screen bg-yellow-900 py-2 pt-4 px-8 w-4/5">
				<div className="flex flex-col justify-between items-center h-full bg-yellow-900">
					<div className="flex flex-col items-center gap-3">
						<ChecklistHeader checklist={checklist} code={code} setChecklist={setChecklist} />
						<div className="w-full">
							<DndContext collisionDetection={closestCorners} onDragEnd={(e) => handleDragEnd(e, tasks, setTasks, code)} sensors={sensors} >
								<ListTask code={code} tasks={tasks} setTasks={setTasks} pagination={pagination} setPagination={setPagination} />
							</DndContext>
						</div>
						<div>
							<AddTask code={code} pagination={pagination} setTasks={setTasks} setPagination={setPagination} />
						</div>
						<div>
							<ChecklistDelete code={code} />
							<Donation />
						</div>
					</div>
					<div className="h-2/12 text-center w-2/3 bg-yellow-800 rounded-2xl mt-8 mb-4">
						<Footer expiredAt={checklist?.expiredAt} code={code} setChecklist={setChecklist} />
					</div>
				</div>
			</div>
		</div>
		)
}