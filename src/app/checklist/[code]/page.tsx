import { notFound } from "next/navigation"
import ChecklistClient from '@/components/elements/ChecklistClient'

const apiweb = process.env.API_WEB
const apikey = process.env.API_KEY

interface PageProps {
	params: Promise<{code: string}>
	searchParams: Promise<{page?: number}>
}

export default async function ChecklistPage({params, searchParams}: PageProps) {
	const resolvedParams = await params
	const activePage = await searchParams
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
			<ChecklistClient initialData={result.data} code={resolvedParams.code} activePage={activePage.page} />
		)
	} catch(error) {
		console.error("Error: ", error)
		return notFound()
	}
}