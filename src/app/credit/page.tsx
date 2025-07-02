"use client"

import Link from "next/link"
import {useRouter} from "next/navigation"

const contributors = [
	{name: "Zombie x Human", role: "Created UI", link: 'https://my-profile-ten-kohl.vercel.app/'},
	{name: "Titik", role: "Created data", link: "https://github.com/titik444"},
	{name: "Michelle Pitzel from pixabay", role: "free image from pixabay, for background in cheklist", link: 'https://pixabay.com/id/users/michelle_pitzel-165491/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4011900'},
	{name: " Piyapong Saydaung from pixabay", role: "Free image from pixabay, for sidebar in top", link: 'https://pixabay.com/id/users/saydung-18713596/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6255516'},
	{name: "Cursor 4u", role: "Free cursor from cursor 4u, for main cursor", link: 'https://www.cursors-4u.com'},
]

export default function CreditPage() {
	const {back} = useRouter()

	const handleBack = () => {
		back()
	}

	return (
		<div className="min-h-screen w-full text-center py-6 md:py-12 dark:bg-indigo-800">
			<h1 className="text-4xl uppercase pb-12 md:pb-8">Credit</h1>
			<dl className="w-[90%] md:w-[30%] text-left m-auto divide-y-2">
				{contributors.map((contributor, index) => (
					<div className="pt-2" key={index}>
						<dt className="text-lg">
							<a href={contributor.link} target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">{contributor.name}</a>
						</dt>
						<dd className="text-pink-600 dark:text-pink-300">
							{contributor.role}
						</dd>
					</div>
				))}
			</dl>
			<div className="pt-8 md:pt-16">
				<Link href="" className="hover:text-red-700 hover:underline decoration-black dark:hover:text-black" onClick={handleBack}>&laquo; back</Link>
			</div>
		</div>
	)
}