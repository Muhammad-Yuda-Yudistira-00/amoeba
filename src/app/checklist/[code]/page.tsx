import { notFound } from "next/navigation"
import ChecklistClient from '@/components/elements/ChecklistClient'
import {fetchChecklist} from '@/services/checklist/QueryChecklist'

const apiweb = process.env.API_WEB
const apikey = process.env.API_KEY

interface PageProps {
	params: Promise<{code: string}>
	searchParams: Promise<{page?: number}>
}

export default async function ChecklistPage({params, searchParams}: PageProps) {
	const resolvedParams = await params
	const activePage = await searchParams

	const code = resolvedParams?.code

	if(!code) {
		notFound()
	}

	try {
		const result = await fetchChecklist(code)

		return(
			<ChecklistClient initialData={result.data} code={resolvedParams.code} activePage={activePage.page} />
		)
	} catch(error) {
		console.error("Error: ", error)
		return notFound()
	}
}