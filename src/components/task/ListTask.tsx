import {useState,useEffect} from "react"
import Task, {PaginationProps} from "@/types/Task"
import {PutTask} from "@/services/task/QueryTask"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import ItemTask from '@/components/task/ItemTask'

export default function ListTask({code, tasks, setTasks, pagination, setPagination}: {code:string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>, pagination: PaginationProps, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>}) {
	const [totalItems, setTotalItems] = useState<number>(0)

	useEffect(() => {
		setTotalItems(tasks.length)
	}, [tasks])

	const handleBlur = (e: React.FocusEvent<Element>) => {
		const taskId = Number(e.currentTarget.getAttribute("data-key"))
		const title = (e.currentTarget as HTMLElement).innerText

		PutTask('title', title, setTasks, code, taskId, pagination, setPagination)
	}

	const handleChange = (taskId: number) => {
		const task = tasks.find(t => t.id === taskId)
		if(!task) return
		const newStatus = task.status === "done" ? "in_progress" : "done"

		setTasks(prevTasks => {
			return prevTasks.map(task => 
				task.id === taskId ? {...task, status: newStatus} : task
			)
		})
		
		PutTask('status', newStatus, setTasks, code, taskId, pagination, setPagination)
	}

	if(totalItems == 0) {
		return (
			<h1 className="capitalize">task empty</h1>
			)
	} else {
		return (
			<ul className="">
				<SortableContext items={tasks} strategy={verticalListSortingStrategy} >
					{tasks && tasks.map(task => (
						<ItemTask key={task.id} task={task} code={code} setTasks={setTasks} handleChange={handleChange} handleBlur={handleBlur} pagination={pagination} setPagination={setPagination} />	
					))}
				</SortableContext>
			</ul>
			)
	}
}