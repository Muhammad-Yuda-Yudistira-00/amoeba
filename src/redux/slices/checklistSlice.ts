import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Checklist from '@/types/Checklist'

const API_URL = process.env.NEXT_PUBLIC_API_WEB
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const fetchChecklist = createAsyncThunk(
	'checklist/fetch',
	async (code: string) => {
		const response = await fetch(`${API_URL}/checklist/${code}`, {
			headers: {
				'x-api-key': API_KEY || ''
			}
		})
		if(!response) throw new Error('Get checklist failed.')
		return response.json()
	}
)

export const deleteChecklist = createAsyncThunk(
	'checklist/deleteChecklist',
	async (code: string) => {
		const response = await fetch(`${API_URL}/checklist/${code}`, {
			method: 'DELETE',
			headers: {
				'x-api-key': API_KEY || ''
			}
		})
		if(!response) throw new Error('Delete checklist failed.')
		return response.json()
	}
)

export const updateChecklistField = createAsyncThunk(
	'checklist/updateField',
	async ({code, field, value}: {code: string, field: 'title' | 'description' | 'expiredAt', value: string | Date}) => {
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
		if(!response.ok) throw new Error('Failed update checklist.')

		return response.json()
	}
)

const checklistSlice = createSlice({
	name: 'checklist',
	initialState: {
		data: null as {data: Checklist} | null,
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
					state.data = action.payload
				}
				state.loading = false
			})
			.addCase(updateChecklistField.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message ?? 'Unknown error'
			})
			.addCase(deleteChecklist.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteChecklist.fulfilled, (state) => {
				state.data = null
				state.loading = false
			})
			.addCase(deleteChecklist.rejected, (state, action) => {
				state.error = action.error.message || 'Update failed'
				state.loading = false
			})
	}
})

export const {clearChecklist} = checklistSlice.actions
export default checklistSlice.reducer