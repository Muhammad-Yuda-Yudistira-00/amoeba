import {useRouter} from 'next/navigation'
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
			const result = await dispatch(deleteChecklist(code)).unwrap()
			if(result) {
				push('/')
			} else {
				return
			}
		}
	}

	return(
		<small className="text-white m-auto text-center w-full inline-block">👊🏻💥 Break this task ??? <button type="button" onClick={handleDeleteChecklist} className="hover:bg-neutral-700 hover:text-stone-400 font-bold">Click Here!!</button></small>
	)
}