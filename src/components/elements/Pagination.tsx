import Link from 'next/link'
import {useSelector} from 'react-redux'
import {RootState} from '@/redux/store'

export default function Pagination({code}: {code: string}) {
	const pagination = useSelector((state: RootState) => state.checklist.pagination)

	return (
		<ul className="pt-4">
			{pagination.totalPages > 0 ? Array.from({length: pagination.totalPages}, (_, i) => (
				<li key={i}>
					<Link href={`/checklist/${code}?page=${i+1}`} className={`hover:brightness-50 font-bold ${pagination.currentPage === i + 1 ? 'text-amber-300 pointer-events-none text-sm md:text-lg' : ''}`}>{i + 1}</Link>
				</li>
			)) : <li key={1}>
					<Link href={`/checklist/${code}?page=${1}`} className={`hover:brightness-50 font-bold text-amber-300 pointer-events-none text-xs md:text-lg`}>1</Link>
				</li>}
		</ul>
	)
}