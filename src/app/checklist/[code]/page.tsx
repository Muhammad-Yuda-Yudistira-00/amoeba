"use client"

import {useEffect, useState} from "react"
import ListTask from "@/components/task/ListTask"
import AddTask from "@/components/task/AddTask"
import Checklist from "@/types/Checklist"
import Checklist from "@/types/Task"

const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function ChecklistPage({params}: {params:Promise<{code: string}>}){
	const [checklist, setChecklist] = useState<Checklist>(null)
	const [tasks, setTasks] = useState<Task[]>([])
	const [code, setCode] = useState<string>(null)

	useEffect(() => {
		params.then((resolvedParams) => {
			setCode(resolvedParams.code)
			fetch('https://checklist.titik.my.id/api/checklist/' + resolvedParams.code, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					"x-api-key": apikey
				}
			})
			.then(res => {
				return res.json()
			})
			.then((data : {data: ChecklistData}) => {
				setChecklist(data.data)
			})
			.catch(err => {
				console.error("Failed to fetching checklist: ", err)
			})

		})
	}, [params])

	const refreshTasks = () => {
		if(!code) return
		fetch(`https://checklist.titik.my.id/api/checklist/${code}/task`, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apikey
			}
		})
	.then(res => res.json())
	.then(data => setTasks(data.data))
	.catch((err) => console.error("Failed to get all tasks: ", err));
	}

	const handleChangeTitle = (e: React.FocusEvent<HTMLHeadingElement>) => {
		const target = e.currentTarget as HTMLElement
		const updatedTitle = target.innerText
		setChecklist(prev => prev ? { ...prev, title: updatedTitle } : null)
		const formData = new URLSearchParams()
		formData.append('title', updatedTitle)
		fetch('https://checklist.titik.my.id/api/checklist/' + checklist.code, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"x-api-key": apikey
			},
			body: formData
		})
		.then(res => res.json())
		.then(data => console.info("success updated title."))
		.catch(err => console.error('Failed to updated title: ', err))
	}

	const handleChangeDescription = (e: React.FormEvent<HTMLHeadingElement>) => {
		const target = e.currentTarget as HTMLElement
		const updatedDescription = target.innerText
		setChecklist(prev => prev ? {...prev, description: updatedDescription} : null)
		const formData = new URLSearchParams()
		formData.append('description', updatedDescription)
		fetch('https://checklist.titik.my.id/api/checklist/' + checklist.code, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"x-api-key": apikey
			},
			body: formData
		})
		.then(res => res.json())
		.then(data => console.info("success updated description."))
		.catch(err => console.error("Failed to update description: ", err))
	}

	return (
		<div className="flex flex-col items-center min-h-screen gap-8 bg-yellow-900 py-6 px-8">
			{checklist ? (
				<>
				<div className="">
					<h1 contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist.title }} onBlur={handleChangeTitle} className="text-6xl px-4"/>
					<div className="bg-yellow-400 text-center">
						<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist.description }} onBlur={handleChangeDescription} className="text-lg px-4 py-2 text-stone-800" />
					</div>
				</div>
				<div>
					<ListTask code={checklist.code} tasks={tasks} setTasks={setTasks} refreshTasks={refreshTasks} />
				</div>
				<div>
					<AddTask code={checklist.code} refreshTasks={refreshTasks} />
				</div>
				</>
				) : (
				<div className="flex justify-center items-center min-h-screen">
					<h1 className="text-3xl">Loading...</h1>
				</div>
				)}
			
		</div>
		)
}