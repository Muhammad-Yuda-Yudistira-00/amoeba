"use client"

import {useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from '@/redux/store'
import {fetchChecklist, updateChecklistField} from '@/redux/slices/checklistSlice'
import {useEffect } from 'react'

export default function ChecklistHeader({code}: {code: string}) {
	const dispatch = useDispatch<AppDispatch>()
	const checklistData = useSelector((state: RootState) => state.checklist.data)

	useEffect(() => {
		dispatch(fetchChecklist(code))
	}, [code, dispatch])

	const handleTitle = (e: React.FocusEvent<HTMLElement>) => {
		const newTitle = e.currentTarget.innerText
		dispatch(updateChecklistField({code, field: 'title', value: newTitle}))
	}

	const handleDescription = (e: React.FocusEvent<HTMLElement>) => {
		const newDescription = e.currentTarget.innerText
		dispatch(updateChecklistField({code, field: 'description', value: newDescription}))
	}

	// if(error) return <p className="text-blue-700 text-2xl">Error: {error}</p>

	return(
		<div className="pb-3 md:pb-8 px-4">
			<h1 
				contentEditable="true" 
				dangerouslySetInnerHTML={{ __html: checklistData?.data.title ?? "" }}
				onBlur={(e) => handleTitle(e)} 
				className="text-5xl md:text-9xl px-4 text-blue-700 text-center pb-2 font-loversQuarrel" 
			/>
			<div className="bg-gradient-to-r bg-amber-200 text-center rounded-sm md:rounded-es-full md:rounded-se-full md:px-8 border-stone-700 border-b-2 border-r-2 md:border-b-4 md:border-r-4 opacity-90">
				<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklistData?.data.description ? checklistData.data.description : 'Descript..' }} onBlur={(e) => handleDescription(e)} className="text-xs md:text-xl px-4 py-1 md:py-2 text-stone-700" />
			</div>
		</div>
	)
}