import { notFound } from "next/navigation"
import ChecklistClient from '@/components/elements/ChecklistClient'

const apiweb = process.env.API_WEB
const apikey = process.env.API_KEY

export default async function ChecklistPage({params}: {params: {code: string}}) {
	try {
		const res = await fetch(`${apiweb}/checklist/${params.code}`,{
			cache: "no-store",
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apikey!
			}
		})

		if(!res.ok) {
			return notFound()
		}

		const data = await res.json()
		console.log({data})

		return(
			<ChecklistClient initialData={data} code={params.code} />
		)
	} catch(error) {
		console.error("Error: ", error)
		return notFound()
	}
}