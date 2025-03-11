export type Task = {
  id: number;
  text: string;
  completed: boolean;
  deleted: boolean;
  createdAt: string;
}

export type NewTaskPayload = Pick<Task, 'text' | 'completed' | 'deleted' | 'createdAt'>

export type TaskCounts = { uncompleted: number; completed: number; deleted: number }

export type Pagination = {
  totalItems: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
}

export type PaginatedList<T> = {
  items: T[];
  pagination: Pagination;
}