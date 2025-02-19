import {PaginationProps} from '@/types/Task'
import Link from 'next/link'

export default function Pagination({pagination, code}: {pagination: PaginationProps, code: string}) {

	return (
		<ul className="pt-4">
			{pagination.totalPages > 0 ? Array.from({length: pagination.totalPages}, (_, i) => (
				<li key={i}>
					<Link href={`/checklist/${code}?page=${i+1}`} className={`hover:brightness-50 font-bold ${pagination.currentPage === i + 1 ? 'text-yellow-600 pointer-events-none' : ''}`}>{i + 1}</Link>
				</li>
			)) : <li key={1}>
					<Link href={`/checklist/${code}?page=${1}`} className={`hover:brightness-50 font-bold text-yellow-600 pointer-events-none`}>1</Link>
				</li>}
		</ul>
	)
}