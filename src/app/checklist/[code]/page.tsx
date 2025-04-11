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

	try {
		const res = await fetch(`${apiweb}/checklist/${code}`, {
			method: 'GET',
			headers: {
				'x-api-key': apikey
			},
			cache: 'no-store'
		})

		if(!res.ok) throw new Error('Failed to fetch: ' + res.status)

	} catch(err) {
		console.error('check checklist: ', err)
		return notFound()
	}

	return(
		<>
		<ChecklistClient code={resolvedParams.code} activePage={activePage.page} />
		</>
	)
}