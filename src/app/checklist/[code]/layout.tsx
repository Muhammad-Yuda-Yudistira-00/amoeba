import Image from "next/image"
import Link from "next/link"

interface ChecklistSidebarProps {
	children: React.ReactNode
}

// top-[120px]

export default function HomeSidebar({children}: ChecklistSidebarProps) {
	return(
		<div className="flex flex-col md:flex-row-reverse bg-yellow-900 min-h-screen overflow-y-auto">
			<div className="w-screen md:w-1/6 bg-lime-600 flex flex-col-reverse justify-end items-center relative md:z-20">
				<div className="bg-yellow-600 px-1 md:px-1 py-2 md:py-4 text-center rounded-t-2xl text-sm md:text-lg fixed top-[145px] right-0 md:top-auto md:bottom-0 md:right-1 w-32 md:w-52">
					<h2 className="text-stone-800 uppercase font-light md:font-bold cursor-crosshair">Amoeba List</h2>
				</div>
				<Link href="/" className="h-[180px] md:h-full w-full md:flex md:justify-center">
					<Image src="/alt-logo/amoeba-1.png" alt="logo" width={180} height={180} title="Back to home" priority className="fixed md:block left-0 md:left-auto" />
				</Link>
			</div>
			<div className="w-5/6 bg-yellow-900 h-full z-10">
				{children}
			</div>
		</div>
		)
}