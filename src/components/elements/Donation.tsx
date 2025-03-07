"use client"

import Link from "next/link"

const urlSaweria = "https://saweria.co/titik444"
const urlWa = "https://wa.me/62895335059382?text=Hello,%20I%20will%20donate%20via%20Dana%20to%20your%20number.%20Please%20confirm"

const Donation = () => {
	return(
		<div className="text-center text-black bg-amber-300 opacity-90 text-base mt-4">
			<small>
				<Link target="_blank" href={urlWa} className="underline hover:text-yellow-800 text-black">
					Give me a coffee ☕!!
				</Link>
			</small>
			<small>
				{" "}or to <Link target="_blank" href={urlSaweria} className="text-black hover:text-yellow-800 font-bold">Saweria</Link>.
			</small>
		</div>
	)
}

export default Donation