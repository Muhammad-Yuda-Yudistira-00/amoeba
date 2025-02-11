import { notFound } from "next/navigation"
import ChecklistClient from '@/components/elements/ChecklistClient'

const apiweb = process.env.API_WEB
const apikey = process.env.API_KEY

interface PageProps {
	params: Promise<{code: string}>
}

export default async function ChecklistPage({params}: PageProps) {
	const resolvedParams = await params
	if(!resolvedParams?.code) {
		notFound()
	}

	try {
		const res = await fetch(`${apiweb}/checklist/${resolvedParams.code}`,{
			cache: "no-store",
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apikey!
			}
		})

		if(!res.ok) {
			return notFound()
		}

		const result = await res.json()

		return(
			<ChecklistClient initialData={result.data} code={resolvedParams.code} />
		)
	} catch(error) {
		console.error("Error: ", error)
		return notFound()
	}
}