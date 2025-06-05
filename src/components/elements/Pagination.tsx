import Link from 'next/link'
import {useSelector} from 'react-redux'
import {RootState} from '@/redux/store'

export default function Pagination({code}: {code: string}) {
	const pagination = useSelector((state: RootState) => state.checklist.pagination)

	return (
		<ul className="pt-4 text-white divide-y-2 bg-[#1a1a1a] w-full">
			{pagination.totalPages > 0 ? Array.from({length: pagination.totalPages}, (_, i) => (
				<li key={i}>
					<Link href={`/checklist/${code}?page=${i+1}`} className={`hover:text-yellow-500 font-bold ${pagination.currentPage === i + 1 ? 'text-yellow-500 pointer-events-none text-sm md:text-lg dividen' : ''}`}>{i + 1}</Link>
				</li>
			)) : <li key={1}>
					<Link href={`/checklist/${code}?page=${1}`} className={`hover:text-yellow-500 font-bold text-yellow-500 pointer-events-none text-xs md:text-lg dividen`}>1</Link>
				</li>}
		</ul>
	)
}