import {arrayMove} from "@dnd-kit/sortable"
import Task from "@/types/Task"

const getTaskPos = (tasks: Task[], id: number) => tasks.findIndex(task => task.id === id)

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

const handleDragEnd = async (
	event: any, 
	tasks: Task[], 
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>, 
	code: string
) => {
	const {active, over} = event

	if(!over || active.id === over.id) return

	const originalPos = getTaskPos(tasks, active.id)
	const newPos = getTaskPos(tasks, over.id)

	setTasks(prevTasks => {
		return arrayMove(prevTasks, originalPos, newPos)
	})

	const data = new URLSearchParams()

	const updatedTask = tasks[newPos]
	data.append('order', updatedTask.order)

	try {
		const res = await fetch(`${apiweb}/checklist/${code}/task/${active.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"x-api-key": apikey
			},
			body: data
		})
	} catch(err) {
		console.error("Error: ", err)
	}
}

export default handleDragEnd