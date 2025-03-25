import {createSlice} from '@reduxjs/toolkit'

const checklistSlice = createSlice({
	name: 'checklist',
	initialState: {
		data: {}
	},
	reducers: {
		updateChecklist: (state, action) => {
			state.data = { ...state.data, ...action.payload}
		}
	}
})

export const {updateChecklist} = checklistSlice.actions
export default checklistSlice.reducer