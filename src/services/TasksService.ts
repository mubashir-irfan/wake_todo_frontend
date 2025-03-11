import { Pagination, Task, TaskCounts } from '@/types';
import { APIEndpoints } from '@/utils';
import { ServerAPI as api } from '.';

const taskEndpoints = APIEndpoints.task;
const allTasksEndpoints = APIEndpoints.tasks;


const TasksService = {
  getTasks: async (page = 1, limit = 10) => {
    const response = await api.get<{ tasks: Task[]; pagination: Pagination }>(`${allTasksEndpoints.getAll()}?_page=${page}&_limit=${limit}`);
    return response.data;
  },

  getTaskCounts: async () => {
    const response = await api.get<TaskCounts>(allTasksEndpoints.getCounts());
    return response.data;
  },

  addTask: async (task: Task) => {
    const response = await api.post<Task, Task>(taskEndpoints.create(), task);
    return response.data;
  },

  updateTask: async (id: number, task: Task) => {
    const response = await api.put<Task, Partial<Task>>(`${taskEndpoints.update(id)}`, task);
    return response.data;
  },

  completeTask: async (id: number) => {
    const response = await api.patch<Task, Partial<Task>>(`${taskEndpoints.update(id)}`, { completed: true });
    return response.data;
  },

  deleteTask: async (id: number) => {
    await api.delete<Task>(`${taskEndpoints.delete(id)}`);
  },
};

export default TasksService;