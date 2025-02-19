import Task, {PaginationProps} from "@/types/Task"

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export function CreateTask(code: string, task: string, pagination: PaginationProps, setTask: React.Dispatch<React.SetStateAction<string>>, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>) {
	const formData = new URLSearchParams()
	formData.append('title', task)

	fetch(`${apiweb}/checklist/${code}/task`, {
			method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"x-api-key": apikey!
		},
		body: formData
	})
	.then(res => res.json())
	.then(() => {
		console.info("Success add new task.")
		setTask("")
		refreshTasks(code, pagination, setTasks, setPagination)
	})
	.catch(err => console.error("Failed to add new task: ", err))
}

export function PutTask(
	name: string, 
	data: string, 
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>, 
	code: string, 
	taskId: number,
	pagination: PaginationProps,
	setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>
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
		refreshTasks(code, pagination, setTasks, setPagination)
	})
	.catch(err => console.error("Failed to update task: ", err))
}

export async function handleDeleteTask(taskId: number, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, code: string, pagination: PaginationProps, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>) {
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
		refreshTasks(code, pagination, setTasks, setPagination)
		console.info("Success to delete task by id.")
	} catch(err) {
		console.error("Error: ", err)
	}
}

export function refreshTasks (code: string, pagination: PaginationProps, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>) {
	if(!code) return
		console.log('refresh: ', pagination.currentPage)
	fetch(`${apiweb}/checklist/${code}/task?page=${pagination.currentPage}`, {
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apikey!
		}
	})
	.then(res => res.json())
	.then(data => {
		setTasks(data.data)
		setPagination(data.pagination)
	})
	.catch((err) => console.error("Failed to get all tasks: ", err));
}