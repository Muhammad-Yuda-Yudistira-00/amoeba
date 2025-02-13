import {PaginationProps} from '@/types/Task'
import Link from 'next/link'

export default function Pagination({pagination, code}: {pagination: PaginationProps, code: string}) {
	return (
		<ul className="pt-4">
			{Array.from({length: pagination.totalPages}, (_, i) => (
				<li key={i}>
					<Link href={`/checklist/${code}?page=${i+1}`} className={`hover:brightness-50 font-bold ${pagination.currentPage === i + 1 ? 'text-yellow-600' : ''}`}>{i + 1}</Link>
				</li>
			))}
		</ul>
	)
}