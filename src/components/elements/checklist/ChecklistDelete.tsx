import {fetchChecklist} from "@/services/checklist/QueryChecklist"
import {useRouter} from 'next/navigation'
import {HttpMethod} from '@/types/HttpMethod'
import {showAlert} from "@/libs/showAlert"
import {useDispatch} from 'react-redux'
import {deleteChecklist} from '@/redux/slices/checklistSlice'
import {AppDispatch} from '@/redux/store'

export default function ChecklistDelete({code}: {code: string}) {
	const {push} = useRouter()
	const dispatch = useDispatch<AppDispatch>()
	
	const handleDeleteChecklist = async () => {
		const confirmed = await showAlert('checklist')
		if(confirmed) {
			// const result = await fetchChecklist({code: code, method: HttpMethod.DELETE, contentType: 'application/json'})
			const result = await dispatch(deleteChecklist(code)).unwrap()
			if(result) {
				push('/')
			} else {
				return
			}
		}
	}

	return(
		<small className="text-amber-700">👊🏻💥 Break this task ??? <button type="button" onClick={handleDeleteChecklist} className="hover:bg-white hover:text-stone-700 font-bold">Click Here!!</button></small>
	)
}