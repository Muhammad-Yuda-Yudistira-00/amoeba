import {arrayMove} from "@dnd-kit/sortable"
import Task from "@/types/Task"
import {DragEndEvent} from "@dnd-kit/core"

const getTaskPos = (tasks: Task[], id: number) => tasks.findIndex(task => task.id === id)

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

const handleDragEnd = async (
	event: DragEndEvent, 
	tasks: Task[], 
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>, 
	code: string
) => {
	const {active, over} = event

	if(!over || active.id === over.id) return

	const originalPos = getTaskPos(tasks, Number(active.id))
	const newPos = getTaskPos(tasks, Number(over.id))

	setTasks(prevTasks => {
		return arrayMove(prevTasks, originalPos, newPos)
	})

	const data = new URLSearchParams()

	const updatedTask = tasks[newPos]
	data.append('order', updatedTask.order.toString())

	try {
		const res = await fetch(`${apiweb}/checklist/${code}/task/${active.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"x-api-key": apikey ?? ""
			},
			body: data
		})

		if(!res.ok) throw new Error("Failed to update the order of task.")

		console.log("Success to update the order of task.")
	} catch(err) {
		console.error("Error: ", err)
	}
}

export default handleDragEnd