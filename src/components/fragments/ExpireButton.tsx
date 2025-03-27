"use client"

import Checklist from "@/types/Checklist"
import {resetExpiredChecklist} from "@/services/checklist/QueryChecklist"
import {useSelector, useDispatch} from 'react-redux'
import {updateChecklistField} from '@/redux/slices/checklistSlice'
import {AppDispatch} from '@/redux/store'
import timeToHuman from "@/utils/timeToHuman"

const ExpireButton = ({code, setChecklist}: {code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>}) => {
	const dispatch = useDispatch<AppDispatch>()

	const resetExpiredAt = () => {
		let newExpiredAt = new Date()
		newExpiredAt.setMonth(new Date().getMonth() + 1)

		newExpiredAt = newExpiredAt.toISOString()
		dispatch(updateChecklistField({code, field: 'expiredAt', value: newExpiredAt}))
	}

	return (
		<div className="flex justify-center gap-4 py-1 text-stone-800">
			<small>Reset expired date???</small>
			<button className="hover:bg-amber-200 bg-white text-black rounded-3xl rounded-l-none rounded-tr-2xl px-2 pr-4 border-white border-2 text-xs" onClick={resetExpiredAt} >reset</button>
		</div>
	)
}

export default ExpireButton