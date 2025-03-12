'use client';
import { Task } from '@/types';
import Todo from './Todo';
import { useCallback, useEffect, useState } from 'react';
import { TasksService } from '@/services';
import useStore from '@/store/useStore';
import { Pagination } from '@/shared/components';
import { TodoListSkeleton, TodoListEmpty, TodoListError } from '@/shared/components/adhoc';
import { getCurrentDateTimeStamp } from '@/utils';
import dayjs from 'dayjs';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isErrorGettingList, setIsErrorGettingList] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { fetchCounts, setSelectedTask, setFetchedAt, updatedAt } = useStore();

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setTimeout(fetchCounts, 100);

    try {
      const data = await TasksService.getTasks(currentPage);

      setTasks(
        data.tasks
          .filter((task) => !task.deleted)
          .sort(
            (a, b) =>
              dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
          ),
      );
      setTotalPages(data.pagination.totalPages);
      setFetchedAt(getCurrentDateTimeStamp());
    } catch (err) {
      setIsErrorGettingList(true);
      if (err instanceof Error) {
        console.error('[TodosWidget] Error in fetching tasks list', err);
      } else {
        console.error('[TodosWidget] Error in fetching tasks list');
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, fetchCounts, setFetchedAt]);

  useEffect(() => {
    fetchTasks();
  }, [currentPage, updatedAt, fetchTasks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMarkComplete = (id: number) => {
    TasksService.markTaskAsComplete(id)
      .then(fetchTasks)
      .catch((err) => console.error('Error marking task complete:', err));
  };

  const handleMarkIncomplete = (id: number) => {
    TasksService.markTaskAsIncomplete(id)
      .then(fetchTasks)
      .catch((err) => console.error('Error marking task incomplete:', err));
  };

  const handleDelete = (id: number) => {
    TasksService.deleteTask(id)
      .then(fetchTasks)
      .catch((err) => console.error('Error deleting task incomplete:', err));
  };

  const handleDoubleClickOnTask = (task: Task) => setSelectedTask(task);

  if (isLoading) return <TodoListSkeleton />;

  if (isErrorGettingList) return <TodoListError />

  if (!tasks.length) return <TodoListEmpty />;
  console.info('rendering list', currentPage, totalPages);
  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-2 shadow-lg">
        {tasks.map((task, index) => (
          <div key={task.id} className="">
            {index > 0 && <hr className="pt-2 border-t border-gray-300" />}
            <Todo
              task={task}
              onMarkComplete={handleMarkComplete}
              onMarkIncomplete={handleMarkIncomplete}
              onDelete={handleDelete}
              onDoubleClick={handleDoubleClickOnTask}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TodoList;
