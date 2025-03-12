import TasksService from '@/services/TasksService';
import ServerAPI from '@/services/server-api';
import { Task, NewTaskPayload, Pagination, TaskCounts } from '@/types';
const api = ServerAPI;

import useStore from '@/store/useStore';
import APIEndpoints from '@/utils/APIEndpoints';

jest.mock('@/store/useStore', () => ({
  getState: jest.fn().mockReturnValue({
    fetchCounts: jest.fn(),
  }),
}));

jest.mock('@/services/server-api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}));

describe('TasksService', () => {
  const allTasksEndpoint = APIEndpoints.tasks;
  const taskEndpoint = APIEndpoints.task;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get tasks', async () => {
    const mockPagination: Pagination = {
      totalItems: 10,
      totalPages: 1,
      pageSize: 10,
      currentPage: 1,
      hasNextPage: false,
    };

    const mockTasks: Task[] = [
      {
        id: 1,
        text: 'Sample Task 1',
        completed: false,
        deleted: false,
        createdAt: '2025-03-10T10:00:00Z',
      },
      {
        id: 2,
        text: 'Sample Task 2',
        completed: true,
        deleted: false,
        createdAt: '2025-03-11T11:00:00Z',
      },
    ];

    (api.get as jest.Mock).mockResolvedValue({
      data: { tasks: mockTasks, pagination: mockPagination },
    });

    const response = await TasksService.getTasks(1, 10);

    expect(api.get).toHaveBeenCalledWith(
      `${allTasksEndpoint.getAll()}?_page=1&_limit=10`,
    );
    expect(response).toEqual({ tasks: mockTasks, pagination: mockPagination });
  });

  it('should get task counts', async () => {
    const mockTaskCounts: TaskCounts = {
      uncompleted: 5,
      completed: 3,
      deleted: 2,
    };

    (api.get as jest.Mock).mockResolvedValue({
      data: mockTaskCounts,
    });

    const response = await TasksService.getTaskCounts();

    expect(api.get).toHaveBeenCalledWith(allTasksEndpoint.getCounts());
    expect(response).toEqual(mockTaskCounts);
  });

  it('should add a task and fetch counts', async () => {
    const newTask: NewTaskPayload = {
      text: 'New Task',
      completed: false,
      deleted: false,
      createdAt: new Date().toISOString(),
    };

    const mockTask: Task = {
      id: 1,
      text: 'New Task',
      completed: false,
      deleted: false,
      createdAt: newTask.createdAt,
    };

    (api.post as jest.Mock).mockResolvedValue({ data: mockTask, status: 201 });

    const result = await TasksService.addTask(newTask);

    expect(api.post).toHaveBeenCalledWith(taskEndpoint.create(), newTask);
    expect(useStore.getState().fetchCounts).toHaveBeenCalled();
    expect(result).toEqual(mockTask);
  });

  it('should update a task', async () => {
    const updatedTask: Task = {
      id: 1,
      text: 'Updated Task',
      completed: true,
      deleted: false,
      createdAt: '2025-03-10T10:00:00Z',
    };

    (api.put as jest.Mock).mockResolvedValue({ data: updatedTask });

    const result = await TasksService.updateTask(1, updatedTask);

    expect(api.put).toHaveBeenCalledWith(
      `${taskEndpoint.update(1)}`,
      updatedTask,
    );
    expect(result).toEqual(updatedTask);
  });

  it('should mark a task as complete', async () => {
    const updatedTask: Task = {
      id: 1,
      text: 'Sample Task',
      completed: true,
      deleted: false,
      createdAt: '2025-03-10T10:00:00Z',
    };

    (api.patch as jest.Mock).mockResolvedValue({ data: updatedTask });

    const result = await TasksService.markTaskAsComplete(1);

    expect(api.patch).toHaveBeenCalledWith(`${taskEndpoint.update(1)}`, {
      completed: true,
    });
    expect(result).toEqual(updatedTask);
  });

  it('should mark a task as incomplete', async () => {
    const updatedTask: Task = {
      id: 1,
      text: 'Sample Task',
      completed: false,
      deleted: false,
      createdAt: '2025-03-10T10:00:00Z',
    };

    (api.patch as jest.Mock).mockResolvedValue({ data: updatedTask });

    const result = await TasksService.markTaskAsIncomplete(1);

    expect(api.patch).toHaveBeenCalledWith(`${taskEndpoint.update(1)}`, {
      completed: false,
    });
    expect(result).toEqual(updatedTask);
  });

  it('should delete a task', async () => {
    (api.delete as jest.Mock).mockResolvedValue({});

    await TasksService.deleteTask(1);

    expect(api.delete).toHaveBeenCalledWith(taskEndpoint.delete(1));
  });
});
