import timeToHuman from "@/utils/timeToHuman"
import ExpireButton from "@/components/fragments/ExpireButton"
import {useSelector, useDispatch} from 'react-redux'
import {fetchChecklist} from '@/redux/slices/checklistSlice'
import {AppDispatch, RootState} from '@/redux/store'
import {useEffect} from 'react'

type FooterProps = {
	code: string
}

const Footer: React.FC<FooterProps> = ({code}) => {
	const dispatch = useDispatch<AppDispatch>()
	const checklistData = useSelector((state: RootState) => state.checklist.data)
	const loading = useSelector((state: RootState) => state.checklist.loading)
	const error = useSelector((state: RootState) => state.checklist.error)

	useEffect(() => {
		dispatch(fetchChecklist(code))
	}, [code, dispatch])

	if(loading) return <p className="text-stone-800 text-lg">Loading..</p>
	if(error) return <p className="text-stone-800 text-lg">Error: {error}</p>

	return(
		<footer className="py-2 px-2">
			<div>
				<p className="text-sm md:text-lg text-stone-800 font-kingthingsXstitch">Your checklist active still in <span className="text-xs md:text-base">{checklistData ? timeToHuman(checklistData?.data.expiredAt) : "-"} / 31</span> days.</p>
			</div>
			<div>
				<ExpireButton code={code} />
			</div>
		</footer>
	)
}

export default Footer