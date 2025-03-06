"use client"

import {useState, useEffect} from "react"
import ListTask from "@/components/task/ListTask"
import AddTask from "@/components/task/AddTask"
import Task, {PaginationProps} from "@/types/Task"
import Footer from "@/components/elements/Footer"
import Donation from "@/components/elements/Donation"
import Pagination from "@/components/elements/Pagination"
import ChecklistHeader from "@/components/elements/ChecklistHeader"
import Checklist from "@/types/Checklist"
import ChecklistDelete from "@/components/elements/checklist/ChecklistDelete"
import fetchTask from "@/services/task/QueryTask"

export default function ChecklistClient({initialData, code, activePage}: {initialData: Checklist, code: string, activePage?: number}){
	const [tasks, setTasks] = useState<Task[]>([])
	const [pagination, setPagination] = useState<PaginationProps>({
		currentPage: 1,
		perPage: 10,
		totalPages: 1,
		totalItems: 10
	})
	const [checklist, setChecklist] = useState<Checklist | null>(initialData)

	activePage = activePage ? activePage : 1

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
	}, [code,activePage])

	return (
		<div className="flex flex-row-reverse w-screen h-full justify-between md:justify-end bg-yellow-900 mb-12">
			<div className="text-center py-4 flex flex-col items-center border-x-2 bg-[url('/themes/patterns/circle-blues.webp')] bg-stone-100 bg-blend-color-burn">
				<span className="[writing-mode:vertical-rl] border-b-2 pb-8">
					<h3 className="text-lg text-stone-300">Pagination</h3>
				</span>
				<div>
					{pagination && (<Pagination pagination={pagination} code={code} />)}
				</div>
			</div>
			<div className="flex flex-col w-full items-center min-h-screen bg-red-700 py-2 pt-4 px-0 md:px-8 md:w-4/5 py-10 bg-[url('/themes/background/city-1.jpg')] bg-cover bg-bottom bg-blend-screen">
				<div className="flex flex-col justify-between items-center h-full">
					<div className="flex flex-col items-center gap-3">
						<ChecklistHeader checklist={checklist} code={code} setChecklist={setChecklist} />
						<div className="w-full">
							<ListTask code={code} tasks={tasks} setTasks={setTasks} pagination={pagination} setPagination={setPagination} />
						</div>
						<div className="pt-8">
							<AddTask code={code} pagination={pagination} setTasks={setTasks} setPagination={setPagination} />
						</div>
						<div>
							<ChecklistDelete code={code} />
							<Donation />
						</div>
					</div>
					<div className="h-2/12 text-center w-[90%] md:w-2/3 bg-gradient-to-r from-white/10 via-lime-300 to-stone-900 mt-4 mb-8 border-2">
						<Footer expiredAt={checklist?.expiredAt} code={code} setChecklist={setChecklist} />
					</div>
				</div>
			</div>
		</div>
		)
}