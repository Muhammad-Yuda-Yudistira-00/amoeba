import {fetchChecklist} from "@/services/checklist/QueryChecklist"
import {useRouter} from 'next/navigation'
import {HttpMethod} from '@/types/HttpMethod'
import {showAlert} from "@/libs/showAlert"

export default function ChecklistDelete({code}: {code: string}) {
	const {push} = useRouter()
	
	const handleDeleteChecklist = async (code: string) => {
		const confirmed = await showAlert()
		if(confirmed) {
			// await deleteChecklist(checklistCode, push)
			const result = await fetchChecklist({code: code, method: HttpMethod.DELETE, contentType: 'application/json'})
			if(result) {
				push('/')
			} else {
				return
			}
		}
	}

	return(
		<small className="text-amber-700">👊🏻💥 Break this task ??? <button type="button" onClick={() => handleDeleteChecklist(code)} className="hover:bg-white hover:text-stone-700 font-bold">Click Here!!</button></small>
	)
}