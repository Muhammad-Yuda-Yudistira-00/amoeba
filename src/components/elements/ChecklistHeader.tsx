"use client"

import { useState } from "react"
import Checklist from "@/types/Checklist"
import {updateChecklist} from "@/services/checklist/QueryChecklist"

export default function ChecklistHeader({code, initialData}: {code: string, initialData: Checklist}) {
	const [checklist, setChecklist] = useState<Checklist | null>(initialData)

	const handleChangeTitle = (e: React.FocusEvent<HTMLHeadingElement>) => {
		const target = e.currentTarget as HTMLElement
		const updatedTitle = target.innerText

		updateChecklist('title', updatedTitle, code)

		setChecklist(prev => prev ? { ...prev, title: updatedTitle } : null)
	}

	const handleChangeDescription = (e: React.FocusEvent<HTMLElement>) => {
		const target = e.currentTarget as HTMLElement
		const updatedDescription = target.innerText

		updateChecklist('description', updatedDescription, code)
		
		setChecklist(prev => prev ? {...prev, description: updatedDescription} : null)
	}

	return(
		<div className="">
			<h1 contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist.title }} onBlur={handleChangeTitle} className="text-6xl px-4"/>
			<div className="bg-yellow-400 text-center rounded-es-full rounded-se-full">
				<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist.description ? checklist.description : 'Descript..' }} onBlur={handleChangeDescription} className="text-lg px-4 py-2 text-stone-700" />
			</div>
		</div>
	)
}