import {fetchChecklist} from "@/services/checklist/QueryChecklist"
import {useRouter} from 'next/navigation'
import {HttpMethod} from '@/types/HttpMethod'

export default function ChecklistDelete({code}: {code: string}) {
	const {push} = useRouter()
	
	const handleDeleteChecklist = async (code: string) => {
		if(confirm("Are you sure???")) {
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
		<small className="text-stone-800">👊🏻💥 Break this task ??? <button type="button" onClick={() => handleDeleteChecklist(code)} className="hover:bg-white font-bold">Click Here!!</button></small>
	)
}