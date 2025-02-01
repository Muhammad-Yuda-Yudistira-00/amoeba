import Image from "next/image"
import Link from "next/link"

export default function HomeSidebar({children}) {
	return(
		<div className="min-h-screen flex flex-row-reverse">
			<div className="w-2/12 bg-lime-600 flex flex-col-reverse justify-between">
				<div className="bg-yellow-500 px-2 py-4 text-center">
					<h2 className="text-stone-800 uppercase font-bold cursor-crosshair">Amoeba</h2>
				</div>
				<Link href="/">
					<Image src="/logo/amoeba-1.png" alt="logo" width={200} height={200} title="Back to home" priority />
				</Link>
			</div>
			<div className="w-10/12">
				{children}
			</div>
		</div>
		)
}