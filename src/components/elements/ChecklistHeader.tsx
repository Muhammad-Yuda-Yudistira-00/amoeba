"use client"

import Checklist from "@/types/Checklist"
import {handleChangeTitle, handleChangeDescription} from '@/services/checklist/QueryChecklist'

export default function ChecklistHeader({checklist, code, setChecklist}: {checklist: Checklist | null, code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>}) {
	return(
		<div className="pb-4 md:pb-8 px-4">
			<h1 contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.title ?? "" }} onBlur={(e) => handleChangeTitle(e, code, setChecklist)} className="text-4xl md:text-8xl px-4 text-black text-center pb-2 font-mutlu" />
			<div className="bg-gradient-to-r bg-lime-300 text-center rounded-sm md:rounded-es-full md:rounded-se-full px-2 md:px-8 border-stone-700 border-b-4 border-r-4 opacity-90">
				<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.description ? checklist.description : 'Descript..' }} onBlur={(e) => handleChangeDescription(e, code, setChecklist)} className="text-sm md:text-xl px-4 py-2 text-stone-700" />
			</div>
		</div>
	)
}