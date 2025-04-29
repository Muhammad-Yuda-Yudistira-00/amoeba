"use client"

// import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useDispatch, useSelector} from 'react-redux'
import {RootState, AppDispatch} from '@/redux/store'
import {addChecklist} from '@/redux/slices/checklistSlice'

export default function CreateChecklistButton () {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()
	const loading = useSelector((state: RootState) => state.checklist.loadingChecklist)

	async function handleClick() {
		try {
			const result = await dispatch(addChecklist())
			if(result) {
				router.push(`/checklist/${result.payload.data.code}`)
			}
		} catch(err) {
			console.log(err)
		}
	}

	return(
		<button onClick={handleClick} disabled={loading} className="bg-stone-400 px-4 py-2 border-8 hover:scale-110 hover:px-8 hover:rotate-12 hover:-translate-x-2 hover:bg-orange-500 uppercase transition-all duration-500 text-xs md:text-lg">
          {loading ? "Loading.." : "create"}
        </button>
	)
}