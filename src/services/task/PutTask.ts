const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function PutTask(name: string, data: string, setTasks: () => void, code: string, taskId: number, refreshTasks: () => void) {
	const formData = new URLSearchParams()
	if(name === 'title') {
		formData.append('title', data)
	} else if(name === 'status') {
		formData.append('status', data)
	}

	fetch(`https://checklist.titik.my.id/api/checklist/${code}/task/${taskId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"x-api-key": apikey
		},
		body: formData
	})
	.then(res => res.json())
	.then(data => {
		console.log("Success to update task.")
		setTasks(prevTasks => 
			prevTasks.map(task => 
				task.id === taskId ? { ...task, data } : task 
				)
			)
		refreshTasks()
	})
	.catch(err => console.error("Failed to update task: ", err))
}