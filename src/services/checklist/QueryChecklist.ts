import Checklist from "@/types/Checklist"
import {HttpMethod} from '@/types/HttpMethod'

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export interface FetchChecklistParams {
	code: string
	method?: HttpMethod
	contentType?: string
	name?: string
	value?: string | Date
}

export async function fetchChecklist({code, method = HttpMethod.GET, contentType = 'application/json', name, value}: FetchChecklistParams): Promise<Checklist | true | false> {
	let response

	try{
		if(method !== 'PATCH') {
			response = await fetch(`${apiweb}/checklist/${code}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey ?? ""
				}
			})
		} else {
			const newData = new URLSearchParams()
			if(name && value) {
				newData.append(name, value instanceof Date ? value.toISOString() : value.toString())
			}

			response = await fetch(`${apiweb}/checklist/${code}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey ?? ""
				},
				body: newData
			})
		}

		if(!response.ok) {
			throw new Error(`Failed fetching checklist ${name}.`)
		}

		if(method !== 'DELETE') {
			const result = await response.json()
			return result.data
		} else {
			return true
		}
	} catch(error) {
		console.error(error)
		return false
	}
}

export async function handleChangeTitle (e: React.FocusEvent<HTMLHeadingElement>, code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>) {
	const target = e.currentTarget as HTMLElement
	const updatedTitle = target.innerText

	await fetchChecklist({code: code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', name: 'title', value: updatedTitle})

	setChecklist(prev => prev ? { ...prev, title: updatedTitle } : null)
}

export async function handleChangeDescription (e: React.FocusEvent<HTMLElement>, code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>) {
	const target = e.currentTarget as HTMLElement
	const updatedDescription = target.innerText

	await fetchChecklist({code: code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', name: 'description', value: updatedDescription})
	
	setChecklist(prev => prev ? {...prev, description: updatedDescription} : null)
}

export async function resetExpiredChecklist(code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>) {
	const expiredAt = new Date()

	const updatedExpiredAt = new Date(expiredAt)
	updatedExpiredAt.setMonth(expiredAt.getMonth() + 1)

	setChecklist(prev => prev ? {...prev, expiredAt: updatedExpiredAt.toISOString()} : null)
	try{
		await fetchChecklist({code: code, method: HttpMethod.PATCH, contentType: 'application/x-www-form-urlencoded', name: 'expiredAt', value: updatedExpiredAt})
	} catch(error) {
		console.error("Error: ", error)
	}
}