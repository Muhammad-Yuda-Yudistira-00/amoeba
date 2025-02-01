import {useState} from "react"

const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function AddTask({code, refreshTasks}: {code: string, refreshTasks: () => void}) {
	const [task, setTask] = useState<string>("")

	const handleChange = (e) => {
		setTask(e.currentTarget.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new URLSearchParams()
		formData.append('title', task)
		setTask(e.currentTarget.value)
		fetch(`https://checklist.titik.my.id/api/checklist/${code}/task`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"x-api-key": apikey
			},
			body: formData
		})
		.then(res => res.json())
		.then(data => {
			console.info("Success add new task.")
			setTask("")
			refreshTasks()
		})
		.catch(err => console.error("Failed to add new task: ", err))
	}

	return (
			<form onSubmit={handleSubmit}>
				<input type="text" name="task" value={task} onChange={handleChange} placeholder="write your ide.." className="text-stone-900 px-2" />
				<button className="px-4 py-2 bg-stone-400 border-4 rounded-2xl">Add</button>
			</form>
		)
}