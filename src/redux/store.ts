import {configureStore} from '@reduxjs/toolkit'
import checklistReducer from '@/redux/slices/checklistSlice'

const makeStore = () => {
	const store =  configureStore({
		reducer: {checklist: checklistReducer}
	})

	console.log('initial state: ', store.getState())

	store.subscribe(() => {
		console.group('[Redux] state changed')
		console.log('Previous state:', store.getState())
	    console.log('Current state:', store.getState())
	    console.groupEnd()
	})

	return store
}


export type AppStore = ReturnType<typeof makeStore>
export type AppStete = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default makeStore