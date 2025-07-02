"use client"

import ContainerHome from '@/components/fragments/ContainerHome'
import {useRouter} from 'next/navigation'

const appName = process.env.NEXT_PUBLIC_APP_NAME


const NotFound = () => {
	const router = useRouter()

	const handleClick = () => {
		router.back()
	}
	return (
		<ContainerHome>
			<div className="text-stone-400 hover:text-stone-500 pb-8 text-2xl font-extralight">
				<h1 className="capitalize cursor-pointer underline" onClick={handleClick}>~~BACK~~</h1>
			</div>
	      <p className="text-stone-400">Page not found</p>
	      <small className="text-stone-500">by {appName}</small>
	    </ContainerHome>
	)
}

export default NotFound