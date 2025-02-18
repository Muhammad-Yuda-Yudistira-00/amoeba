"use client"

import Checklist from "@/types/Checklist"
import {handleChangeTitle} from '@/services/checklist/QueryChecklist'

export default function ChecklistHeader({checklist, onChangeDescription, code, setChecklist}: {checklist: Checklist | null, onChangeDescription: (e: React.FocusEvent<HTMLElement>) => void, code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>}) {
	return(
		<div className="">
			<h1 contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.title ?? "" }} onBlur={(e) => handleChangeTitle(e, code, setChecklist)} className="text-6xl px-4"/>
			<div className="bg-yellow-400 text-center rounded-es-full rounded-se-full">
				<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.description ? checklist.description : 'Descript..' }} onBlur={onChangeDescription} className="text-lg px-4 py-2 text-stone-700" />
			</div>
		</div>
	)
}