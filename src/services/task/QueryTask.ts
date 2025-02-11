import Task from "@/types/Task"

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export function PutTask(
	name: string, 
	data: string, 
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>, 
	code: string, 
	taskId: number, 
	refreshTasks: () => void
) {
	const formData = new URLSearchParams()
	if(name === 'title') {
		formData.append('title', data)
	} else if(name === 'status') {
		formData.append('status', data)
	}

	fetch(`${apiweb}/checklist/${code}/task/${taskId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"x-api-key": apikey ?? ""
		},
		body: formData
	})
	.then(res => res.json())
	.then(data => {
		console.log("Success to update task.")
		setTasks(prevTasks => 
			prevTasks.map(task => 
				task.id === taskId ? { ...task, data } : task 
				)
			)
		refreshTasks()
	})
	.catch(err => console.error("Failed to update task: ", err))
}

export async function handleDeleteTask(taskId: number, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, code: string) {
	try {
		const res = await fetch(`${apiweb}/checklist/${code}/task/${taskId}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apikey ?? ""
			}
		})
		if(!res.ok) throw new Error("Failed to delete task!")
		setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
		console.info("Success to delete task by id.")
	} catch(err) {
		console.error("Error: ", err)
	}
}