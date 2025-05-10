import { notFound } from "next/navigation"
import ChecklistClient from '@/components/elements/ChecklistClient'

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
			headers: apikey ? {
				'x-api-key': apikey
			} : {},
			cache: 'no-store'
		})

		if(!res.ok) throw new Error('Failed to fetch: ' + res.status)

	// untuk mencegah page kosong selain page 1, tapi ga bisa mungkin keberatan dan jaringan lemot
	// 	const resTasks = await fetch(`${apiweb}/checklist/${code}/tasks`, {
	// 		headers: apikey ? {
	// 			'x-api-key': apikey
	// 		} : {},
	// 		cache: 'no-store'
	// 	})

	// 	if(!resTasks.ok) throw new Error(`Failed to fetch: ${resTasks.message}`)

	// 	const tasks = await resTasks.json()
	// console.log("daa: ", tasks)
	// 	// if(tasks.data.length === 0) return notFound()

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