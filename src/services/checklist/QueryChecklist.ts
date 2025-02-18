import Checklist from "@/types/Checklist"

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

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