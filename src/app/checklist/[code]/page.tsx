import { notFound } from "next/navigation"
import ChecklistClient from '@/components/elements/ChecklistClient'
import {fetchChecklist} from '@/services/checklist/QueryChecklist'

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

	return(
		<>
		<ChecklistClient code={resolvedParams.code} activePage={activePage.page} />
		</>
	)
}