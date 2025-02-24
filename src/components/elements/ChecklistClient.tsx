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
							<ListTask code={code} tasks={tasks} setTasks={setTasks} pagination={pagination} setPagination={setPagination} />
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