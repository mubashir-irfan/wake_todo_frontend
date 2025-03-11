'use client';
import { Task } from '@/types';
import Todo from './Todo';
import { useEffect, useState } from 'react';
import { TasksService } from '@/services';
import useStore from '@/store/useStore';
import { Pagination } from '@/shared/components';
import { TodoListSkeleton, TodoListEmpty } from '@/shared/components/adhoc';


const TodoList: React.FC = () => {
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
  }, [currentPage, fetchCounts]);

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


  if (isLoading) return <TodoListSkeleton />

  if (!tasks.length) return <TodoListEmpty />

  return (
    <div className='flex flex-col gap-3' >
      <div className="space-y-2 shadow-lg">
        {tasks.map((task, index) => (
          <div key={task.id}>
            {index > 0 && <hr className="border-t border-gray-300" />}
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