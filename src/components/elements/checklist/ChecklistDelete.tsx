import {fetchChecklist} from "@/services/checklist/QueryChecklist"
import {useRouter} from 'next/navigation'

export default function ChecklistDelete({code}: {code: string}) {
	const {push} = useRouter()
	
	const handleDeleteChecklist = async (code: string) => {
		if(confirm("Are you sure???")) {
			// await deleteChecklist(checklistCode, push)
			const result = await fetchChecklist({code: code, method: 'DELETE', contentType: 'application/json'})
			if(result) {
				push('/')
			} else {
				return
			}
		}
	}

	return(
		<small>👊🏻💥 Break this task ??? <button type="button" onClick={() => handleDeleteChecklist(code)} className="hover:text-yellow-400 font-bold">Click Here!!</button></small>
	)
}