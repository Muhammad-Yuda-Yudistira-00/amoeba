import Link from 'next/link'
import Image from 'next/image'

const appName = process.env.NEXT_PUBLIC_APP_NAME

export default function Sidebar() {
	return(
		<div className="w-screen md:w-1/6 bg-indigo-700 flex flex-col-reverse justify-end items-center relative md:z-20 selection:bg-orange-600">
			<Link href="/">
				<div className="hover:brightness-75 brightness-95 border-black border-2 border-b-0 px-1 md:px-1 py-2 md:py-4 text-center text-sm md:text-lg fixed top-[145px] right-0 md:top-auto md:bottom-0 md:right-3 w-32 md:w-48 bg-green-400 group rounded-t-lg">
					<h2 className="text-black uppercase font-light md:font-bold group-hover:shadow-2xl">{appName}</h2>
				</div>
				
			</Link>
			<div className="h-[180px] md:h-full w-full md:flex md:justify-center">
				<Image src="/themes/background/shoes-girl.jpg" alt="logo" width={180} height={180} title="Touch Me !!" priority className="fixed md:block left-0 md:left-auto md:bg-transparent" />
				<small className="pt-60 text-white text-xs text-center">
					Image by <a href="https://pixabay.com/id/users/saydung-18713596/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6255516" target="_blank" className="hover:text-orange-400 text-neutral-300">Piyapong Saydaung</a> from <a href="https://pixabay.com/id//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6255516" className="hover:text-green-400 text-green-300" target="_blank">Pixabay</a>
				</small>
			</div>
		</div>
	)
}

