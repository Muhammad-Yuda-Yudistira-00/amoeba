import {configureStore} from '@reduxjs/toolkit'
import checklistReducer from '@/redux/slices/checklistSlice'

const makeStore = () => {
	const store =  configureStore({
		reducer: {checklist: checklistReducer}
	})

	console.log('initial state: ', store.getState())

	store.subscribe(() => {
	    console.log('Current state:', store.getState())
	})

	return store
}


export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type RootState = AppState

export default makeStore