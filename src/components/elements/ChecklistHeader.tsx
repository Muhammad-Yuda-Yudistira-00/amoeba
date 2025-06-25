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

	return(
		<div className="pb-3 md:pb-4 px-4 md:pt-8">
			<h1 
				contentEditable="true" 
				dangerouslySetInnerHTML={{ __html: checklistData?.data.title ?? "" }}
				onBlur={(e) => handleTitle(e)} 
				className="text-3xl md:text-7xl font-extrabold px-4 text-indigo-700 text-center pb-4 md:pb-9"
				style={{ fontFamily: "Playwrite DK Loopet"}} 
			/>
			<div className="bg-gradient-to-r from-white/20 via-black/20 to-white/20 text-center rounded-sm md:rounded-es-2xl md:rounded-se-full md:px-4 md:pl-0 border-indigo-700 border-b-2 border-r-2 md:border-b-4 md:border-r-4">
				<small 
					contentEditable="true" 
					dangerouslySetInnerHTML={{ __html: checklistData?.data.description ? checklistData.data.description : 'Descript..' }} 
					onBlur={(e) => handleDescription(e)} 
					className="text-xs font-light md:text-lg px-2 md:px-4 py-0 md:py-2 text-black font-geistMono"
				/>
			</div>
		</div>
	)
}