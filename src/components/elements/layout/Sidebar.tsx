import Link from 'next/link'
import Image from 'next/image'

export default function Sidebar() {
	return(
		<div className="w-screen md:w-1/6 bg-lime-100 flex flex-col-reverse justify-end items-center relative md:z-20 bg-[url('/themes/patterns/cork-board.webp')] bg-blend-luminosity">
			<Link href="/">
				<div className="hover:brightness-75 brightness-95 border-2 border-b-0 bg-yellow-600 px-1 md:px-1 py-2 md:py-4 text-center rounded-t-2xl text-sm md:text-lg fixed top-[145px] right-0 md:top-auto md:bottom-0 md:right-1 w-32 md:w-52 bg-[url('/themes/patterns/cork-board.webp')] group">
					<h2 className="text-stone-700 uppercase font-light md:font-bold group-hover:shadow-2xl">Amoeba List</h2>
				</div>
				
			</Link>
			<div className="h-[180px] md:h-full w-full md:flex md:justify-center">
				<Image src="/alt-logo/amoeba-1.webp" alt="logo" width={180} height={180} title="Touch Me !!" priority className="fixed md:block left-0 md:left-auto hover:animate-spin hover:bg-orange-700 md:bg-white transition-all" />
			</div>
		</div>
	)
}