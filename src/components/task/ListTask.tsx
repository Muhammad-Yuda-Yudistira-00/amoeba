import {useState,useEffect} from "react"
import Task, {PaginationProps} from "@/types/Task"
import fetchTask from "@/services/task/QueryTask"
import {HttpMethod} from "@/types/HttpMethod"
import ItemTask from '@/components/task/ItemTask'

export default function ListTask({code, tasks, setTasks, pagination, setPagination}: {code:string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>, pagination: PaginationProps, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>}) {
	const [totalItems, setTotalItems] = useState<number>(0)

	useEffect(() => {
		setTotalItems(tasks.length)
	}, [tasks])

	const handleBlur = async (e: React.FocusEvent<Element>) => {
		const taskId = Number(e.currentTarget.getAttribute("data-key"))
		const title = (e.currentTarget as HTMLElement).innerText

		// PutTask('title', title, setTasks, code, taskId, pagination, setPagination)

		const result = await fetchTask({code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', name: 'title', value: title, taskId})
		if(result) {
			setTasks(prevTasks => prevTasks.map(prevTask => prevTask.id === taskId ? (Array.isArray(result.data) ? result.data[0] : result.data) : prevTask))
		}
	}

	if(totalItems == 0) {
		return (
			<h1 className="capitalize text-center w-full">task empty</h1>
			)
	} else {
		return (
			<ul className="px-0">
				{tasks && tasks.map(task => (
					<ItemTask key={task.id} task={task} code={code} setTasks={setTasks} handleBlur={handleBlur} pagination={pagination} setPagination={setPagination} />	
				))}
			</ul>
			)
	}
}