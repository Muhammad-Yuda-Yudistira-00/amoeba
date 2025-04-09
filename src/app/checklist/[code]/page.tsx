import { notFound } from "next/navigation"
import ChecklistClient from '@/components/elements/ChecklistClient'
import {fetchChecklist} from '@/services/checklist/QueryChecklist'

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

interface PageProps {
	params: Promise<{code: string}>
	searchParams: Promise<{page?: number}>
}

export default async function ChecklistPage({params, searchParams}: PageProps) {
	const resolvedParams = await params
	const activePage = await searchParams

	const code = resolvedParams?.code

	const res = await fetch(`${apiweb}/checklist/${code}`, {
		method: 'GET',
		headers: {
			'x-api-key': apikey
		},
		cache: 'no-store'
	})

	if(!res.ok) return notFound()

	const data = await res.json()

	if(!data || !data.data) return notFound()

	return(
		<>
		<ChecklistClient code={resolvedParams.code} activePage={activePage.page} />
		</>
	)
}