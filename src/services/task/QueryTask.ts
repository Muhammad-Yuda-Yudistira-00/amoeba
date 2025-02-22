import Task, {PaginationProps} from "@/types/Task"
import {HttpMethod} from '@/types/HttpMethod'

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export interface FetchTaskProps {
	code: string
	currentPage?: number
	id?: number
	name?: string
	value?: string
	method?: HttpMethod
	contentType?: string
}

export default async function fetchTask({code, currentPage, id, name, value, method = HttpMethod.GET, contentType = 'application/json'}: FetchTaskProps): Promise<Task | null> {
	let response

	try {
		if(method === 'GET') {
			response = await fetch(`${apiweb}/checklist/${code}/task?page=${currentPage}`, {
				method: method,
				headers: {
					'Content-type': contentType,
					'x-api-key': apikey ?? ""
				}
			})
		} else if(method === 'PATCH') {
			const newData = new URLSearchParams()
			if(name && value) {
				newData.append(name, value)
			}

			response = await fetch(`${apiweb}/checklist/${code}/task/${id}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey ?? ""
				},
				body: newData
			})
		} else {
			response = await fetch(`${apiweb}/checklist/${code}/task/${id}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey ?? ""
				}
			})
		}

		if(!response.ok) {
			throw new Error(`Failed fetching task: ${response.status}: ${serponse.statusText}`)
		}

		const result = await response.json()
		return result

	} catch(error) {
		console.error(error)
		return null
	}
}

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