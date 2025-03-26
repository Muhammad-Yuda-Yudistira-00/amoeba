"use client"

import Checklist from "@/types/Checklist"
import {useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from '@/redux/store'
import {updateChecklistField} from '@/redux/slices/checklistSlice'
import { useEffect } from 'react'

export default function ChecklistHeader({checklist, code, setChecklist}: {checklist: Checklist | null, code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>}) {
	const checklistData = useSelector((state: RootState) => state.checklist.data)
	const dispatch = useDispatch<AppDispatch>()

	const handleTitle = (e) => {
		const newTitle = e.currentTarget.innerText
		dispatch(updateChecklistField({code, field: 'title', value: newTitle}))
		setChecklist(prev => ({...prev, title: newTitle}))
	}

	const handleDescription = (e) => {
		const newDescription = e.currentTarget.innerText
		dispatch(updateChecklistField({code, field: 'description', value: newDescription}))
		setChecklist(prev => ({...prev, description: newDescription}))
	}

	console.log('[Page] Current data:', checklistData)

	return(
		<div className="pb-4 md:pb-8 px-4">
			<h1 contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.title ?? "" }} onBlur={(e) => handleTitle(e)} className="text-4xl md:text-8xl px-4 text-blue-700 text-center pb-2 font-mutlu" />
			<div className="bg-gradient-to-r bg-amber-200 text-center rounded-sm md:rounded-es-full md:rounded-se-full md:px-8 border-stone-700 border-b-2 border-r-2 md:border-b-4 md:border-r-4 opacity-90">
				<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.description ? checklist.description : 'Descript..' }} onBlur={(e) => handleDescription(e)} className="text-sm md:text-xl px-4 py-2 text-stone-700" />
			</div>
		</div>
	)
}