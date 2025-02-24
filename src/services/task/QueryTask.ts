import Task, {PaginationProps} from "@/types/Task"
import {HttpMethod} from '@/types/HttpMethod'

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export interface FetchTaskProps {
	code: string
	currentPage?: number
	taskId?: number
	name?: string
	value?: string
	method?: HttpMethod
	contentType?: string
}

export default async function fetchTask({code, method = HttpMethod.GET, contentType = 'application/json', currentPage, taskId, name, value}: FetchTaskProps): Promise<{data: Task[]; pagination: PaginationProps} | null> {
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

			response = await fetch(`${apiweb}/checklist/${code}/task/${taskId}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey ?? ""
				},
				body: newData
			})
		} else if(method === 'POST') {
			const newData = new URLSearchParams()
			if(name && value) {
				newData.append(name, value)
			}
			response = await fetch(`${apiweb}/checklist/${code}/task`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey ?? ""
				},
				body: newData
			})
		} else if(method === 'DELETE') {
			response = await fetch(`${apiweb}/checklist/${code}/task/${taskId}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey ?? ""
				}
			})
		}

		if(!response.ok) {
			throw new Error(`Failed fetching task: ${response.status}: ${response.statusText}`)
		}

		const result = await response.json()
		return result

	} catch(error) {
		console.error(error)
		return null
	}
}