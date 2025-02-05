const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export function updateChecklist(name: string, data: string, code: string): void {
	const formData = new URLSearchParams()
	formData.append(name, data)
	fetch(`${apiweb}/checklist/${code}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"x-api-key": apikey
		},
		body: formData
	})
	.then(res => res.json())
	.then(data => console.info(`Success updated ${name}.`))
	.catch(err => console.error('Failed to updated title: ', err))
}

export async function deleteChecklist(checklistId: number, push: (url: string) => void): void {
	try{
		const res = await fetch(`${apiweb}/checklist/${checklistId}`, {
			method: "DELETE",
			headers: {
				"x-api-key": apikey
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