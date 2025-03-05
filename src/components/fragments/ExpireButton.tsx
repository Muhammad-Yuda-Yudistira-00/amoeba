"use client"

import Checklist from "@/types/Checklist"
import {resetExpiredChecklist} from "@/services/checklist/QueryChecklist"

const ExpireButton = ({code, setChecklist}: {code: string, setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>}) => {
	return (
		<div className="flex justify-center gap-4 py-1 text-stone-800">
			<small>Reset expired date???</small>
			<button className="hover:bg-black bg-white text-black rounded-3xl rounded-l-none rounded-tr-2xl px-2 pr-4 hover:text-white border-white border-2 text-xs" onClick={() => resetExpiredChecklist(code, setChecklist)} >reset</button>
		</div>
	)
}

export default ExpireButton