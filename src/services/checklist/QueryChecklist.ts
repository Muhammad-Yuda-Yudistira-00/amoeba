import Checklist from "@/types/Checklist"

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export async function fetchChecklist(code, method = 'GET', contentType = 'application/json', name?, value?) {
	let response

	try{
		if(method !== 'PATCH') {
			response = await fetch(`${apiweb}/checklist/${code}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey
				}
			})
		} else {
			const newData = new URLSearchParams()
			newData.append(name, value)

			response = await fetch(`${apiweb}/checklist/${code}`, {
				method: method,
				headers: {
					'Content-Type': contentType,
					'x-api-key': apikey
				},
				body: newData
			})
		}

		if(!response.ok) {
			throw new Error(`Failed fetching checklist ${name}.`)
		}

		const result = await response.json()
		return result

	} catch(error) {
		console.error(error)
		return null
	}
}

export function updateChecklist(name: string, data: string | number | Date, code: string): void {
	const formData = new URLSearchParams()

	const value = data instanceof Date ? data.toISOString() : data.toString()
	formData.append(name, value)

	fetch(`${apiweb}/checklist/${code}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"x-api-key": apikey ?? ""
		},
		body: formData
	})
	.then(res => res.json())
	.then(() => console.info(`Success updated ${name}.`))
	.catch(err => console.error('Failed to updated title: ', err))
}

export function handleChangeTitle (e: React.FocusEvent<HTMLHeadingElement>, code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>) {
	const target = e.currentTarget as HTMLElement
	const updatedTitle = target.innerText

	updateChecklist('title', updatedTitle, code)

	setChecklist(prev => prev ? { ...prev, title: updatedTitle } : null)
}

export async function handleChangeDescription (e: React.FocusEvent<HTMLElement>, code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>) {
	const target = e.currentTarget as HTMLElement
	const updatedDescription = target.innerText

	// updateChecklist('description', updatedDescription, code)
	await fetchChecklist(code, 'PATCH', 'application/x-www-form-urlencoded', 'description', updatedDescription)
	
	setChecklist(prev => prev ? {...prev, description: updatedDescription} : null)
}

export async function resetExpiredChecklist(code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>) {
	const expiredAt = new Date()

	const updatedExpiredAt = new Date(expiredAt)
	updatedExpiredAt.setMonth(expiredAt.getMonth() + 1)

	setChecklist(prev => prev ? {...prev, expiredAt: updatedExpiredAt.toISOString()} : null)
	try{
		await updateChecklist('expiredAt', updatedExpiredAt, code)
	} catch(error) {
		console.error("Error: ", error)
	}
}

export async function deleteChecklist(checklistCode: string, push: (url: string) => void): Promise<void> {
	try{
		const res = await fetch(`${apiweb}/checklist/${checklistCode}`, {
			method: "DELETE",
			headers: {
				"x-api-key": apikey ?? ""
			}
		})

		if(!res.ok) {
			throw new Error('Failed to delete checklist.')
		} 

		console.info('Success deleted checklist.')
		push('/')
	} catch(err) {
		console.error('Error: ', err)
	}
}
	console.info('Success deleted checklist.')