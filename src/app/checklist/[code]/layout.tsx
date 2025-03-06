import Sidebar from "@/components/elements/layout/Sidebar"

interface ChecklistSidebarProps {
	children: React.ReactNode
}

// top-[120px]

export default function HomeSidebar({children}: ChecklistSidebarProps) {
	return(
		<div className="flex flex-col md:flex-row-reverse bg-yellow-900 min-h-screen overflow-y-auto bg-[url('/themes/patterns/mosaic.webp')] bg-blend-luminosity">
			<Sidebar />
			<div className="w-5/6 z-10 max-h-screen md:max-h-[100%]">
				{children}
			</div>
		</div>
		)
}