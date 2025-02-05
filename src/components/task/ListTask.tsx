import {useState,useEffect} from "react"
import Task from "@/types/Task"
import {PutTask} from "@/services/task/QueryTask"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import ItemTask from '@/components/task/ItemTask'

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function ListTask({code, tasks, setTasks, refreshTasks}: {code:string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>, refreshTasks: () => void}) {
	const [totalItems, setTotalItems] = useState<number>(0)

	useEffect(() => {
		fetch(`${apiweb}/checklist/${code}/task`,{
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apikey ?? ""
			}	
		})
		.then(res => res.json())
		.then(data => {
			setTasks(data.data)
			setTotalItems(data.pagination.totalItems)
		})
		.catch(err => console.error("Failed to get all task: ", err))
	}, [code])

	const handleBlur = (e: React.FocusEvent<Element>) => {
		const taskId = Number(e.currentTarget.getAttribute("data-key"))
		const title = (e.currentTarget as HTMLElement).innerText

		PutTask('title', title, setTasks, code, taskId, refreshTasks)
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
		PutTask('status', newStatus, setTasks, code, taskId, refreshTasks)
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
						<ItemTask key={task.id} task={task} code={code} setTasks={setTasks} handleChange={handleChange} handleBlur={handleBlur} />	
					))}
				</SortableContext>
			</ul>
			)
	}
}