import {deleteChecklist} from "@/services/checklist/QueryChecklist"
import {useRouter} from 'next/navigation'

export default function ChecklistDelete({code}: {code: string}) {
	const {push} = useRouter()
	
	const handleDeleteCheklistClick = async (checklistCode: string) => {
		if(confirm("Are you sure???")) {
			await deleteChecklist(checklistCode, push)
		}
	}

	return(
		<small>👊🏻💥 Break this task ??? <button type="button" onClick={() => handleDeleteCheklistClick(code)} className="hover:text-yellow-400 font-bold">Click Here!!</button></small>
	)
}