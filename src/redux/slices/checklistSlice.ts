import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Checklist from '@/types/Checklist'
import Task, {PaginationProps} from '@/types/Task'

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
		if(!response.ok) throw new Error('Get checklist failed.')
		return response.json()
	}
)

export const addChecklist = createAsyncThunk(
	'checklist/addChecklist',
	async () => {
		const response = await fetch(`${API_URL}/checklist`, {
			method: "POST",
		  headers: {
		    "Content-Type": "application/json",
		    "x-api-key": API_KEY!
		  }
		})
		if(!response.ok) throw new Error('Create checklist failed.')
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
		if(!response.ok) throw new Error('Delete checklist failed.')
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

export const getTask = createAsyncThunk(
	'checklist/getTask',
	async ({code, taskId}: {code: string, taskId: number}) => {
		const response = await fetch(`${API_URL}/checklist/${code}/task/${taskId}`, {
			headers: {
				'x-api-key': API_KEY ?? ''
			}
		})

		if(!response.ok) throw new Error('Failed get task.')

		return response.json()
	}
)

export const getTasks = createAsyncThunk(
	'checklist/getTasks',
	async ({code, currentPage}: {code: string, currentPage: number}) => {
		const response = await fetch(`${API_URL}/checklist/${code}/task?page=${currentPage}`, {
			headers: {
				'x-api-key': API_KEY ?? ''
			}
		})

		if(!response.ok) throw new Error('Failed get tasks.')

		return response.json()
	}
)

export const addTask = createAsyncThunk(
	'checklist/addTask',
	async ({code, title, level, order}: {code: string, title: string, level: number, order?: number}) => {
		const newTask = new URLSearchParams()
		newTask.append('title', title)
		newTask.append('level', level.toString())
		if(order) {
			newTask.append('order', order.toString())
		}

		const response = await fetch(`${API_URL}/checklist/${code}/task`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-api-key': API_KEY ?? ''
			},
			body: newTask
		})

		if(!response.ok) throw new Error('Failed add task.')

		return response.json()
	}
)

export const updateTask = createAsyncThunk(
	'checklist/updateTask',
	async ({code, taskId, field, value, level = 1}: {code: string, taskId: number, field: 'title' | 'status' | 'level', value: string | number, level?: number}) => {
		const updatedData = new URLSearchParams()

		if(field === 'level') {
			updatedData.append(field, value.toString())
		} else {
			updatedData.append(field, value.toString())
			updatedData.append('level', level.toString())
		}

		const response = await fetch(`${API_URL}/checklist/${code}/task/${taskId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-api-key': API_KEY ?? ''
			},
			body: updatedData
		})

		if(!response.ok) throw new Error('Failed update task.')

		return response.json()
	}
)

export const updateOrderTask = createAsyncThunk(
	'checklist/updateRoderTask',
	async ({code, taskId, order, level}: {code: string, taskId: number, order: number, level: number}) => {
		const newOrder = new URLSearchParams()
		newOrder.append('order', order.toString())
		newOrder.append('level', level.toString())

		const response = await fetch(`${API_URL}/checklist/${code}/task/${taskId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-api-key': API_KEY ?? ''
			},
			body: newOrder
		})

		if(!response.ok) throw new Error('Failed change order.')

		return response.json()
	}
)

export const deleteTask = createAsyncThunk(
	'checklist/deleteTask',
	async ({code, taskId}: {code: string, taskId: number}) => {
		const response = await fetch(`${API_URL}/checklist/${code}/task/${taskId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': API_KEY ?? ''
			}
		})

		if(!response.ok) throw new Error('Failed delete task.')

		return taskId
	}
)

const checklistSlice = createSlice({
	name: 'checklist',
	initialState: {
		data: null as {data: Checklist} | null,
		tasks: [] as Task[],
		selectedTask: null as Task | null,
		loading: false,
		loadingChecklist: false,
		loadingAddTask: false,
		error: null as string | null,
		errorAddTask: null as string | null,
		pagination: {} as PaginationProps,
		success: false as boolean
	},
	reducers: {
		clearChecklist: (state) => {
			state.data = null
			state.tasks = []
			state.selectedTask = null
			state.loading = false
			state.loadingChecklist = false
			state.loadingAddTask = false
			state.error = null
			state.errorAddTask = null
			state.pagination = {
				currentPage: 1,
				perPage: 10,
				totalPages: 1,
				totalItems: 0
			}
			state.success = false
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchChecklist.pending, (state) => {
				state.loadingChecklist = true
				state.error = null
			})
			.addCase(fetchChecklist.fulfilled, (state, action) => {
				state.data = action.payload
				state.loadingChecklist = false
			})
			.addCase(fetchChecklist.rejected, (state, action) => {
				state.loadingChecklist = false
				state.error = action.error.message || 'Fetch failed'
			})
			.addCase(addChecklist.pending, (state) => {
				state.loadingChecklist = true
				state.error = null
			})
			.addCase(addChecklist.fulfilled, (state, action) => {
				// state.data = action.payload.data
				state.success = true
				state.loadingChecklist = false
			})
			.addCase(addChecklist.rejected, (state, action) => {
				state.loadingChecklist = false
				state.error = action.error.message || 'Fetch failed'
			})
			.addCase(updateChecklistField.fulfilled, (state, action) => {
				if(state.data) {
					state.data = action.payload
				}
				state.loadingChecklist = false
			})
			.addCase(updateChecklistField.rejected, (state, action) => {
				state.loadingChecklist = false
				state.error = action.error.message ?? 'Unknown error'
			})
			.addCase(deleteChecklist.pending, (state) => {
				state.loadingChecklist = true
				state.error = null
			})
			.addCase(deleteChecklist.fulfilled, (state) => {
				state.data = null
				state.loadingChecklist = false
			})
			.addCase(deleteChecklist.rejected, (state, action) => {
				state.error = action.error.message || 'Update failed'
				state.loadingChecklist = false
			})
			.addCase(getTask.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(getTask.fulfilled, (state, action) => {
				state.selectedTask = action.payload.data
				state.loading = false
			})
			.addCase(getTask.rejected, (state, action) => {
				state.error = action.error.message || 'Failed get task'
				state.loading = false
			})
			.addCase(getTasks.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.tasks = Array.isArray(action.payload.data) ? action.payload.data : []
				state.pagination = action.payload.pagination
				state.loading = false
			})
			.addCase(getTasks.rejected, (state, action) => {
				state.error = action.error.message || 'Failed get tasks'
				state.loading = false
			})
			.addCase(addTask.pending, (state) => {
				state.loadingAddTask = true
				state.errorAddTask = null
			})
			.addCase(addTask.fulfilled, (state) => {
				state.loadingAddTask = false
			})
			.addCase(addTask.rejected, (state, action) => {
				state.errorAddTask = action.error.message || 'terjadi kesalahan.'
				state.loadingAddTask = false
			})
			.addCase(updateTask.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const updatedTask = action.payload.data
				state.tasks = state.tasks.map(task => {
					return task.id === updatedTask.id ? updatedTask : task
				})
				state.loading = false
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'terjadi kesalahan.'
			})
			.addCase(updateOrderTask.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateOrderTask.fulfilled, (state) => {
				state.loading = false
			})
			.addCase(updateOrderTask.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'terjadi kesalahan.'
			})
			.addCase(deleteTask.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				const deletedTask = action.payload
				console.log({deletedTask})
				state.tasks = state.tasks.filter(task => task.id !== deletedTask)
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'terjadi kesalahan.'
			})
	}
})

export const {clearChecklist} = checklistSlice.actions
export default checklistSlice.reducer