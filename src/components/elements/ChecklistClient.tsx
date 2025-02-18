"use client"

import {useState, useEffect} from "react"
import{useRouter} from "next/navigation"
import ListTask from "@/components/task/ListTask"
import AddTask from "@/components/task/AddTask"
import Task, {PaginationProps} from "@/types/Task"
import {deleteChecklist, updateChecklist} from "@/services/checklist/QueryChecklist"
import {DndContext, closestCorners, PointerSensor, TouchSensor, KeyboardSensor, useSensors, useSensor} from "@dnd-kit/core"
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable"
import handleDragEnd from "@/libs/@dnd-kit/handleDragEnd"
import Footer from "@/components/elements/Footer"
import Donation from "@/components/elements/Donation"
import Pagination from "@/components/elements/Pagination"
import ChecklistHeader from "@/components/elements/ChecklistHeader"
import Checklist from "@/types/Checklist"

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function ChecklistClient({initialData, code, activePage}: {initialData: Checklist, code: string, activePage?: number}){
	const [tasks, setTasks] = useState<Task[]>([])
	const [pagination, setPagination] = useState<PaginationProps | null>(null)
	const [checklist, setChecklist] = useState<Checklist | null>(initialData)

	activePage = activePage ? activePage : 1

	const {push} = useRouter()

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

	const refreshTasks = () => {
		if(!code) return
		fetch(`${apiweb}/checklist/${code}/task?page=${activePage}`, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apikey!
			}
		})
		.then(res => res.json())
		.then(data => {
			setTasks(data.data)
		})
		.catch((err) => console.error("Failed to get all tasks: ", err));
	}

	const handleChangeTitle = (e: React.FocusEvent<HTMLHeadingElement>) => {
		const target = e.currentTarget as HTMLElement
		const updatedTitle = target.innerText

		updateChecklist('title', updatedTitle, code)

		setChecklist(prev => prev ? { ...prev, title: updatedTitle } : null)
	}

	const handleChangeDescription = (e: React.FocusEvent<HTMLElement>) => {
		const target = e.currentTarget as HTMLElement
		const updatedDescription = target.innerText

		updateChecklist('description', updatedDescription, code)
		
		setChecklist(prev => prev ? {...prev, description: updatedDescription} : null)
	}

	const handleDeleteCheklistClick = async (checklistCode: string) => {
		if(window.confirm("Are you sure???")) {
			await deleteChecklist(checklistCode, push)
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
		<div className="flex flex-row-reverse w-screen justify-end">
			<div className="text-center py-4 flex flex-col items-center">
				<span className="[writing-mode:vertical-rl] border-b-2 pb-8">
					<h3 className="text-lg">Pagination</h3>
				</span>
				<div>
					{pagination && (<Pagination pagination={pagination} code={code} />)}
				</div>
			</div>
			<div className="flex flex-col items-center h-screen gap-8 bg-yellow-900 py-2 px-8 w-4/5">
				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col items-center gap-3">
						<ChecklistHeader checklist={checklist} onChangeTitle={handleChangeTitle} onChangeDescription={handleChangeDescription} />
						<div>
							<DndContext collisionDetection={closestCorners} onDragEnd={(e) => handleDragEnd(e, tasks, setTasks, code)} sensors={sensors} >
								<ListTask code={code} tasks={tasks} setTasks={setTasks} refreshTasks={refreshTasks} />
							</DndContext>
						</div>
						<div>
							<AddTask code={code} refreshTasks={refreshTasks} />
						</div>
						<div>
							<small>👊🏻💥 Break this task ??? <button type="button" onClick={() => handleDeleteCheklistClick(code)} className="hover:text-yellow-400 font-bold">Click Here!!</button></small>
							<Donation />
						</div>
					</div>
					<div className="h-2/12 text-center w-full bg-yellow-800 rounded-2xl">
						<Footer expiredAt={checklist?.expiredAt} code={code} setChecklist={setChecklist} />
					</div>
				</div>
			</div>
		</div>
		)
}