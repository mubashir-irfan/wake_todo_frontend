// src/components/Todos.tsx
'use client';

import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import { TasksService } from '@/services';
import { Task } from '@/types';
import { Pagination } from '@/shared/components';
import useStore from '@/store/useStore';

const TodosWidget = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { fetchCounts, setSelectedTask } = useStore();
  console.log(isLoading, errorMessage)
  const fetchTasks = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(fetchCounts, 100);

    try {
      const data = await TasksService.getTasks(currentPage);
      setTasks(data.tasks.filter(task => !task.deleted));
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      if (err instanceof Error) {
        console.error('[TodosWidget] Error in fetching tasks list,err')
        setErrorMessage(err.message);
      } else {
        console.error('[TodosWidget] Error in fetching tasks list')
        setErrorMessage('Failed to fetch Tasks list');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMarkComplete = (id: number) => {
    TasksService.markTaskAsComplete(id).then(fetchTasks).catch(err => console.error('Error marking task complete:', err))
  }

  const handleMarkIncomplete = (id: number) => {
    TasksService.markTaskAsIncomplete(id).then(fetchTasks).catch(err => console.error('Error marking task incomplete:', err))
  };

  const handleDelete = (id: number) => {
    TasksService.deleteTask(id).then(fetchTasks).catch(err => console.error('Error deleting task incomplete:', err))
  };

  const handleDoubleClickOnTask = (task: Task) => setSelectedTask(task)

  return (
    <div className='h-full w-full flex flex-col gap-4'>
      <TodoList
        tasks={tasks}
        onMarkTaskComplete={handleMarkComplete}
        onMarkTaskIncomplete={handleMarkIncomplete}
        onDelete={handleDelete}
        onDoubleClickTask={handleDoubleClickOnTask}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TodosWidget;