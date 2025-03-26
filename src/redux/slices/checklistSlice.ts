import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Checklist from '@/types/Checklist'

const API_URL = process.env.NEXT_PUBLIC_API_WEB
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const fetchChecklist = createAsyncThunk(
	'checklist/fetch',
	async(code: string) => {
		const response = await fetch(`${API_URL}/checklist/${code}`, {
			headers: {
				'x-api-key': API_KEY || ''
			}
		})
		if(!response) throw new Error('Fetching failed')
		return response.json()
	}
)

export const updateChecklistField = createAsyncThunk(
	'checklist/updateField',
	async({code, field, value}: {code: string, field: 'title' | 'description' | 'expiredAt', value: string | Date}) => {
		const body = new URLSearchParams({
			[field]: value instanceof Date ? value.toISOString() : value
		})
		const response = await fetch(`${API_URL}/checklist/${code}`, {
			method: 'PATCH',	
			body,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-api-key': API_KEY || ''
			}
		})

		return {field, value}
	}
)

const checklistSlice = createSlice({
	name: 'checklist',
	initialState: {
		data: null as Checklist | null,
		loading: false,
		error: null as string | null
	},
	reducers: {
		clearChecklist: (state) => {
			state.data = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchChecklist.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchChecklist.fulfilled, (state, action) => {
				state.data = action.payload
				state.loading = false
			})
			.addCase(fetchChecklist.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Fetch failed'
			})
			.addCase(updateChecklistField.fulfilled, (state, action) => {
				if(state.data) {
					state.data[action.payload.field] = action.payload.value
					if(action.payload.field === 'expiredAt' && typeof action.payload.value === 'string') {
						state.data.expiredAt = new Date(action.payload.value).toISOString()

					}
				}
			})
			.addCase(updateChecklistField.rejected, (state, action) => {
				state.error = action.error.message || 'Update failed'
			})
	}
})

export const {clearChecklist} = checklistSlice.actions
export default checklistSlice.reducer