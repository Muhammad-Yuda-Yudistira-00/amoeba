"use client"

import {useEffect, useState} from "react"
import{useRouter} from "next/navigation"
import ListTask from "@/components/task/ListTask"
import AddTask from "@/components/task/AddTask"
import Checklist from "@/types/Checklist"
import Task from "@/types/Task"
import {updateChecklist, deleteChecklist} from "@/services/checklist/QueryChecklist"
import {DndContext, closestCorners, PointerSensor, TouchSensor, KeyboardSensor, useSensors, useSensor} from "@dnd-kit/core"
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable"
import handleDragEnd from "@/libs/@dnd-kit/handleDragEnd"
import Footer from"@/components/elements/Footer"

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function ChecklistPage({params}: {params:Promise<{code: string}>}){
	const [checklist, setChecklist] = useState<Checklist | null>(null)
	const [tasks, setTasks] = useState<Task[]>([])
	const [code, setCode] = useState<string>("")
	const {push} = useRouter()

	useEffect(() => {
		params.then((resolvedParams) => {
			setCode(resolvedParams.code)
			fetch(`${apiweb}/checklist/${resolvedParams.code}`, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					"x-api-key": apikey!
				}
			})
			.then(res => {
				return res.json()
			})
			.then((data : {data: Checklist}) => {
				setChecklist(data.data)
			})
			.catch(err => {
				console.error("Failed to fetching checklist: ", err)
			})

		})
	}, [params])

	const refreshTasks = () => {
		if(!code) return
		fetch(`${apiweb}/checklist/${code}/task`, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apikey!
			}
		})
	.then(res => res.json())
	.then(data => setTasks(data.data))
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

	const handleExpireClick = async () => {
		const expiredAt = new Date()
		const updatedExpiredAt = expiredAt.setMonth(expiredAt.getMonth() + 1)

		setChecklist(prev => prev ? {...prev, updatedExpiredAt} : null)
		try{
			await updateChecklist('expiredAt', updatedExpiredAt, code)
		} catch(error) {
			console.error("Error: ", error)
		}

	}

	return (
		<div className="flex flex-col items-center h-screen gap-8 bg-yellow-900 py-6 px-8">
			{checklist ? (
				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col items-center gap-4">
						<div className="">
							<h1 contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist.title }} onBlur={handleChangeTitle} className="text-6xl px-4"/>
							<div className="bg-yellow-400 text-center rounded-es-full rounded-se-full">
								<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist.description }} onBlur={handleChangeDescription} className="text-lg px-4 py-2 text-stone-800" />
							</div>
						</div>
						<div>
							<DndContext collisionDetection={closestCorners} onDragEnd={(e) => handleDragEnd(e, tasks, setTasks, code)} sensors={sensors} >
								<ListTask code={checklist.code} tasks={tasks} setTasks={setTasks} refreshTasks={refreshTasks} />
							</DndContext>
						</div>
						<div>
							<AddTask code={checklist.code} refreshTasks={refreshTasks} />
						</div>
						<div>
							<small>👊🏻💥 Break this task ??? <button type="button" onClick={() => handleDeleteCheklistClick(checklist.code)} className="hover:text-sky-400 underline font-bold">Click Here!!</button></small>
						</div>
					</div>
					<div className="h-2/12 text-center w-full bg-yellow-800 rounded-2xl">
						<Footer expiredAt={checklist.expiredAt} onExpireClick={handleExpireClick} />
					</div>
				</div>
				) : (
					<div className="flex justify-center items-center h-screen">
						<h1>Loading...</h1>
					</div>
				)}
			
		</div>
		)
}