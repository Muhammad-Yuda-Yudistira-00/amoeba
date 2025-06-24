"use client"

import {useDispatch} from 'react-redux'
import {updateChecklistField} from '@/redux/slices/checklistSlice'
import {AppDispatch} from '@/redux/store'

const ExpireButton = ({code, }: {code: string}) => {
	const dispatch = useDispatch<AppDispatch>()

	const resetExpiredAt = () => {
		const newExpiredAt = new Date()
		newExpiredAt.setMonth(new Date().getMonth() + 1)

		const expiredAtISO = newExpiredAt.toISOString()
		dispatch(updateChecklistField({code, field: 'expiredAt', value: expiredAtISO}))
	}

	return (
		<div className="flex justify-center gap-4 py-0 md:py-1 text-stone-900">
			<small>Reset expired date.. </small>
			<button className="hover:bg-indigo-700 hover:border-indigo-700 hover:text-black bg-neutral-400 text-black rounded-3xl rounded-l-none rounded-tr-2xl px-1 md:px-2 pr-3 md:pr-4 border-neutral-700 border-2 text-xs" onClick={resetExpiredAt} >reset</button>
		</div>
	)
}

export default ExpireButton