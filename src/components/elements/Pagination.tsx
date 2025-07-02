import Link from 'next/link'
import {useSelector} from 'react-redux'
import {RootState} from '@/redux/store'
import { Mina } from "next/font/google"

const mina = Mina({
	subsets: ["latin"],
	weight: ["400", "700"]
})

export default function Pagination({code}: {code: string}) {
	const pagination = useSelector((state: RootState) => state.checklist.pagination)

	return (
		<ul className="pt-4 text-white divide-y-2 bg-indigo-400 w-full last:border-b-4">
			{pagination.totalPages > 0 ? Array.from({length: pagination.totalPages}, (_, i) => (
				<li key={i}>
					<Link href={`/checklist/${code}?page=${i+1}`} className={`${mina.className} w-full h-full inline-block hover:bg-orange-900 ${pagination.currentPage === i + 1 ? 'text-orange-900 pointer-events-none text-xs md:text-lg dividen' : ''}`}>{i + 1}</Link>
				</li>
			)) : <li key={1}>
					<Link href={`/checklist/${code}?page=${1}`} className={`w-full h-full inline-block hover:bg-orange-900 text-orange-900 pointer-events-none text-xs md:text-lg dividen`}>1</Link>
				</li>}
		</ul>
	)
}