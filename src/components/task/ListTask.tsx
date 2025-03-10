import Task, {PaginationProps} from "@/types/Task"
import fetchTask from "@/services/task/QueryTask"
import {HttpMethod} from "@/types/HttpMethod"
import ItemTask from '@/components/task/ItemTask'

export default function ListTask({code, tasks, setTasks, pagination, setPagination}: {code:string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>, pagination: PaginationProps, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>}) {

	const handleBlur = async (e: React.FocusEvent<Element>) => {
		const taskId = Number(e.currentTarget.getAttribute("data-key"))
		const title = (e.currentTarget as HTMLElement).innerText

		const result = await fetchTask({code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', name: 'title', value: title, taskId})
		if(result) {
			setTasks(prevTasks => prevTasks.map(prevTask => prevTask.id === taskId ? (Array.isArray(result.data) ? result.data[0] : result.data) : prevTask))
		}
	}

	if(pagination.totalItems > 0) {
		return (
			<ul className="px-0">
				{tasks && tasks.map(task => (
					<ItemTask key={task.id} task={task} code={code} setTasks={setTasks} handleBlur={handleBlur} pagination={pagination} setPagination={setPagination} />	
				))}
			</ul>
			)
	} else {
		return (
			<h1 className="capitalize text-center w-full font-loversQuarrel text-black text-5xl">task empty</h1>
			)
	}
}