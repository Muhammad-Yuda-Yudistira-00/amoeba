import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Checklist from '@/types/Checklist'
import Task, {PaginationProps} from '@/types/Task'

const API_URL = process.env.NEXT_PUBLIC_API_WEB
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const perPage = 15

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
		const response = await fetch(`${API_URL}/checklist/${code}/task?page=${currentPage}&per_page=${perPage}`, {
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
	async ({code, title, level, order, currentPage}: {code: string, title: string, level: number, order?: number, currentPage: number}) => {
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

		const updatedTasks = await fetch(`${API_URL}/checklist/${code}/task?page=${currentPage}&per_page=${perPage}`, {
			headers: {
				'x-api-key': API_KEY ?? ''
			}
		})

		return updatedTasks.json()
	}
)

export const updateTask = createAsyncThunk(
	'checklist/updateTask',
	async ({code, taskId, field, value}: {code: string, taskId: number, field: 'title' | 'status' | 'level', value: string | number}) => {
		const updatedData = new URLSearchParams()

		updatedData.append(field, value.toString())

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
	async ({code, taskId, order}: {code: string, taskId: number, order: number}) => {
		const newOrder = new URLSearchParams()
		newOrder.append('order', order.toString())

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
	async ({code, taskId, currentPage}: {code: string, taskId: number, currentPage: number}) => {
		const response = await fetch(`${API_URL}/checklist/${code}/task/${taskId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': API_KEY ?? ''
			}
		})

		if(!response.ok) throw new Error('Failed delete task.')

		// return taskId
		if(currentPage) {
			const updatedTasks = await fetch(`${API_URL}/checklist/${code}/task?page=${currentPage}&per_page=${perPage}`, {
				headers: {
					'x-api-key': API_KEY ?? ''
				}
			})
			return updatedTasks.json()
		}
		return 
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
		loadingAddSubtask: false,
		loadingTasks: false,
		error: null as string | null,
		errorAddTask: null as string | null,
		pagination: {} as PaginationProps,
	},
	reducers: {
		clearChecklist: (state) => {
			state.data = null
			state.tasks = []
			state.selectedTask = null
			state.loading = false
			state.loadingChecklist = false
			state.loadingAddTask = false
			state.loadingAddSubtask = false
			state.loadingTasks = false
			state.error = null
			state.errorAddTask = null
			state.pagination = {
				currentPage: 1,
				perPage: 10,
				totalPages: 1,
				totalItems: 0
			}
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
			.addCase(addChecklist.fulfilled, (state) => {
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
				state.loadingTasks = true
				state.error = null
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.tasks = Array.isArray(action.payload.data) ? action.payload.data : []
				state.pagination = action.payload.pagination
				state.loadingTasks = false
			})
			.addCase(getTasks.rejected, (state, action) => {
				state.error = action.error.message || 'Failed get tasks'
				state.loadingTasks = false
			})
			.addCase(addTask.pending, (state, action) => {
				const level = action.meta.arg?.level 

				state.errorAddTask = null
				if(level === 1) {
					state.loadingAddTask = true
				} else {
					state.loadingAddSubtask = true
				}
			})
			.addCase(addTask.fulfilled, (state, action) => {
				const level = action.meta.arg?.level 

				state.tasks = action.payload.data
				state.pagination = action.payload.pagination

				if(level === 1) {
					state.loadingAddTask = false
				} else {
					state.loadingAddSubtask = false
				}
			})
			.addCase(addTask.rejected, (state, action) => {
				const level = action.meta.arg?.level
				
				state.errorAddTask = action.error.message || 'terjadi kesalahan.'

				if(level === 1) {
					state.loadingAddTask = false
				} else {
					state.loadingAddSubtask = false
				}
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
			.addCase(updateOrderTask.fulfilled, (state, action) => {
				const updatedTask = action.payload.data
				state.loading = false

				const currentTask = state.tasks.find(task => task.id === updatedTask.id)
				if(!currentTask) return

				const oldOrder = currentTask.order
				const newOrder = updatedTask.order

				currentTask.order = newOrder

				state.tasks.forEach(task => {
					if(task.id !== updatedTask.id) {
						if(newOrder > oldOrder) {
							if(task.order > oldOrder && task.order <= newOrder) {
								task.order -= 1
							}
						} else if(newOrder < oldOrder) {
							if(task.order < oldOrder && task.order >= newOrder) {
								task.order += 1
							}
						}
					}
				})

				state.tasks.sort((a, b) => a.order - b.order)
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
				state.tasks = action.payload.data
				state.pagination = action.payload.pagination
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'terjadi kesalahan.'
			})
	}
})

export const {clearChecklist} = checklistSlice.actions
export default checklistSlice.reducer