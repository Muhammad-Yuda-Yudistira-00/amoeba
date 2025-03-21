type Task = {
	id: number;
	order: number;
	title: string;
	status: string;
	parentId: number;
	level: number;
	children: array;
}

export type PaginationProps = {
	currentPage: number;
	perPage: number;
	totalPages: number;
	totalItems: number;
}

export default Task