import Task from '@/types/Task'
import {handleDeleteTask} from '@/services/task/QueryTask'
import {Trash2} from "lucide-react"
import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"


const ItemTask = ({
	task, 
	code,
	setTasks,
	handleChange,
	handleBlur
	}:{
		task: Task,
		code: string, 
		setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
		handleChange: (taskId: number) => void,
		handleBlur: (e: React.FocusEvent) => void
	}) => {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id})

	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	}

	return(
		<div 
			className="flex justify-between gap-8"
		>
			<div className="flex gap-4">
				<button type="button" onClick={() => {
					if(window.confirm("Wanna break this task?")) {
						handleDeleteTask(task.id, setTasks, code)
					}
				}}>
					<Trash2 size={20} />
				</button>
				<input type="checkbox" name="status" checked={task.status === "done"} onChange={() => handleChange(task.id)} className="accent-lime-600" />
				<div
					ref={setNodeRef}
					{...attributes}
					{...listeners}
					style={{
						...style,
						touchAction: "none"
					}}
				>
					<li data-key={task.id} className={`text-2xl px-4 decoration-white ${task.status === "done" ? "line-through" : ""}`} contentEditable dangerouslySetInnerHTML={{ __html: task.title }} onBlur={handleBlur} />
				</div>
			</div>					
		</div>
	)
}

export default ItemTask