import Sidebar from "@/components/elements/layout/Sidebar"
import type {Metadata} from 'next'


export const metadata: Metadata = {
	title: `${process.env.NEXT_PUBLIC_APP_NAME} | Checklist`,
	robots: 'noindex, nofollow'
}

interface ChecklistSidebarProps {
	children: React.ReactNode
}

// top-[120px]

export default function HomeSidebar({children}: ChecklistSidebarProps) {
	return(
		<>
		<div className="flex flex-col md:flex-row-reverse bg-stone-700 min-h-screen overflow-y-auto">
			<Sidebar />
			<div className="w-5/6 z-10 max-h-screen md:max-h-[100%]">
				{children}
			</div>
		</div>
		</>
		)
}