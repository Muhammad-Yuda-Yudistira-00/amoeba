import Link from 'next/link'
import Image from 'next/image'

const appName = process.env.NEXT_PUBLIC_APP_NAME

export default function Sidebar() {
	return(
		<div className="w-screen md:w-1/6 bg-stone-400 flex flex-col-reverse justify-end items-center relative md:z-20 bg-[url('/themes/background/accent-bg.jpg')] bg-cover">
			<Link href="/">
				<div className="hover:brightness-75 brightness-95 border-black border-2 border-b-0 px-1 md:px-1 py-2 md:py-4 text-center text-sm md:text-lg fixed top-[145px] right-0 md:top-auto md:bottom-0 md:right-3 w-32 md:w-48 bg-gradient-to-b from-white via-stone-700 to-stone-700 group rounded-t-lg">
					<h2 className="text-white bg-black uppercase font-light md:font-bold group-hover:shadow-2xl">{appName}</h2>
				</div>
				
			</Link>
			<div className="h-[180px] md:h-full w-full md:flex md:justify-center">
				<Image src="/alt-logo/check-lipst-brand.png" alt="logo" width={180} height={180} title="Touch Me !!" priority className="fixed md:block left-0 md:left-auto md:bg-transparent" />
			</div>
		</div>
	)
}