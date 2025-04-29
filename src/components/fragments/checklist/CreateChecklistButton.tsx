"use client"

// import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useDispatch, useSelector} from 'react-redux'
import {RootState, AppDispatch} from '@/redux/store'
import {addChecklist} from '@/redux/slices/checklistSlice'
// import {unwrap} from '@reduxjs/toolkit'

const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function CreateChecklistButton () {
	// const [loading, setLoading] = useState(false)
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()
	const success = useSelector((state: RootState) => state.checklist.success)
	// const checklist = useSelector((state: RootState) => state.checklist.data)
	const loading = useSelector((state: RootState) => state.checklist.loadingChecklist)

	async function handleClick() {
		// setLoading(true)
		try {
			const result = await dispatch(addChecklist())
			console.log({result})
			if(result) {
				router.push(`/checklist/${result.payload.data.code}`)
			}
		} catch(err) {
			console.log(err)
		}
		// fetch(`${apiweb}/checklist`, {
		//   method: "POST",
		//   headers: {
		//     "Conten-Type": "application/json",
		//     "x-api-key": apikey!
		//   }
		// }).then(res => res.json())
		// .then(data => {
		//   router.push("/checklist/" + data.data.code)
		// })
	}

	return(
		<button onClick={handleClick} disabled={loading} className="bg-stone-400 px-4 py-2 border-8 hover:scale-110 hover:px-8 hover:rotate-12 hover:-translate-x-2 hover:bg-orange-500 uppercase transition-all duration-500 text-xs md:text-lg">
          {loading ? "Loading.." : "create"}
        </button>
	)
}