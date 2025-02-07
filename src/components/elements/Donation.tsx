"use client"

import Link from "next/link"

const urlWa = "https://wa.me/62895335059382?text=Hello,%20I%20will%20donate%20via%20Dana%20to%20your%20number.%20Please%20confirm"

const Donation = () => {
	return(
		<div className="text-center">
			<small>
				<Link target="_blank" href={urlWa} className="underline text-lime-400 hover:text-lime-500">
					Give me a coffee ☕!!
				</Link>
			</small>
		</div>
	)
}

export default Donation