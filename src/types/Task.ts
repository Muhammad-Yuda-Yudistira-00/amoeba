type Task = {
	id: number;
	order: number;
	title: string;
	status: string;
	level: number;
}

export type PaginationProps = {
	currentPage: number;
	perPage: number;
	totalPages: number;
	totalItems: number;
}

export default Task