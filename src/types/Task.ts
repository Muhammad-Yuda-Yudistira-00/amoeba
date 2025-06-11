type Task = {
	id: number;
	order: number;
	title: string;
	status: string;
	level: number;
	type: string
}

export type PaginationProps = {
	currentPage: number;
	perPage: number;
	totalPages: number;
	totalItems: number;
}

export type MetaProps = {
	totalInProgress: number;
	totalDone: number;
}

export default Task