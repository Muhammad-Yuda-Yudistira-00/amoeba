import Image from "next/image"
import Link from "next/link"

interface ChecklistSidebarProps {
	children: React.ReactNode
}

export default function HomeSidebar({children}: ChecklistSidebarProps) {
	return(
		<div className="flex flex-row-reverse bg-yellow-900 min-h-screen overflow-y-auto">
			<div className="w-1/6 bg-lime-600 flex flex-col-reverse justify-end items-center relative">
				<div className="bg-yellow-500 px-2 py-4 text-center rounded-t-2xl fixed bottom-0 right-2 w-52">
					<h2 className="text-stone-800 uppercase font-bold cursor-crosshair">Amoeba List</h2>
				</div>
				<Link href="/">
					<Image src="/alt-logo/amoeba-1.png" alt="logo" width={180} height={180} title="Back to home" priority />
				</Link>
			</div>
			<div className="w-5/6 bg-yellow-900 h-full">
				{children}
			</div>
		</div>
		)
}