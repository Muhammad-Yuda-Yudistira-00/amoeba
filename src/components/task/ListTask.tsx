import {useState,useEffect} from "react"
import Task from "@/types/Task"
import PutTask from "@/services/task/PutTask"

const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function ListTask({code, tasks, setTasks, refreshTasks}: {code:string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>, refreshTasks: () => void}) {
	const [totalItems, setTotalItems] = useState<number>(0)

	useEffect(() => {
		fetch('https://checklist.titik.my.id/api/checklist/' + code + '/task',{
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apikey
			}	
		})
		.then(res => res.json())
		.then(data => {
			setTasks(data.data)
			setTotalItems(data.pagination.totalItems)
		})
		.catch(err => console.error("Failed to get all task: ", err))
	}, [code])

	const handleBlur = (e) => {
		const taskId = e.currentTarget.getAttribute("data-key")
		const title = e.currentTarget.innerText

		PutTask('title', title, setTasks, code, taskId, refreshTasks)
	}

	const handleChange = (taskId) => {
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
				{tasks && tasks.map(task => (
					<div key={task.id} className="flex justify-between gap-8">
						<div className="flex gap-4">
							<input type="checkbox" name="status" checked={task.status === "done"} onChange={() => handleChange(task.id)} />
							<li data-key={task.id} className="text-2xl" contentEditable dangerouslySetInnerHTML={{ __html: task.title }} onBlur={handleBlur} />
						</div>
						{task.status == "done" && (<span className="text-green-500">✔</span>)}						
					</div>
				))}
			</ul>
			)
	}
}