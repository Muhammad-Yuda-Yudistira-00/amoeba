"use client"

import Checklist from "@/types/Checklist"

export default function ChecklistHeader({checklist, onChangeTitle, onChangeDescription}: {checklist: Checklist | null, onChangeTitle: (e: React.FocusEvent<HTMLHeadingElement>) => void, onChangeDescription: (e: React.FocusEvent<HTMLElement>) => void}) {
	return(
		<div className="">
			<h1 contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.title ?? "" }} onBlur={onChangeTitle} className="text-6xl px-4"/>
			<div className="bg-yellow-400 text-center rounded-es-full rounded-se-full">
				<small contentEditable="true" dangerouslySetInnerHTML={{ __html: checklist?.description ? checklist.description : 'Descript..' }} onBlur={onChangeDescription} className="text-lg px-4 py-2 text-stone-700" />
			</div>
		</div>
	)
}