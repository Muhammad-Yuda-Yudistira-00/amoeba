import Link from 'next/link'
import Image from 'next/image'

export default function Sidebar() {
	return(
		<div className="w-screen md:w-1/6 bg-amber-200 flex flex-col-reverse justify-end items-center relative md:z-20 bg-[url('/themes/patterns/cork-board.webp')] bg-blend-multiply">
			<Link href="/">
				<div className="hover:brightness-75 brightness-95 border-black border-2 border-b-0 px-1 md:px-1 py-2 md:py-4 text-center text-sm md:text-lg fixed top-[145px] right-0 md:top-auto md:bottom-0 md:right-3 w-32 md:w-48 bg-[url('/themes/patterns/metallic-holographic.jpg')] bg-blend-color-burn bg-red-500 group rounded-t-lg">
					<h2 className="text-black uppercase font-light md:font-bold group-hover:shadow-2xl">Amoeba List</h2>
				</div>
				
			</Link>
			<div className="h-[180px] md:h-full w-full md:flex md:justify-center">
				<Image src="/alt-logo/amoeba-1.webp" alt="logo" width={180} height={180} title="Touch Me !!" priority className="fixed md:block left-0 md:left-auto md:bg-transparent" />
			</div>
		</div>
	)
}