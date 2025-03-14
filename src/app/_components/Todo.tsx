import { Task } from '@/types';
import { useEffect, useRef } from 'react';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';

interface TodoProps {
  task: Task;
  onMarkComplete: (id: number) => void;
  onMarkIncomplete: (id: number) => void;
  onDelete: (id: number) => void;
  onDoubleClick: (task: Task) => void;
}

const Todo: React.FC<TodoProps> = ({
  task,
  onMarkComplete,
  onMarkIncomplete,
  onDelete,
  onDoubleClick,
}) => {
  const handleComplete = () => {
    onMarkComplete(task.id);
  };

  const handleIncomplete = () => {
    onMarkIncomplete(task.id);
  };

  // Long Press Logic to allow editing on touch devices
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onDoubleClick(task);
    }, 250);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
      <button
        onClick={task.completed ? handleIncomplete : handleComplete}
        className={`cursor-pointer ${task.completed ? 'text-black-600' : 'opacity-25'} `}
      >
        <FaCheckCircle size={20} />
      </button>

      <span
        className={`flex-1 mx-3 ${task.completed ? 'line-through' : ''}`}
        onDoubleClick={() => onDoubleClick(task)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {task.text}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
      >
        <div>
          <FaTrash size={20} />
        </div>
      </button>
    </div>
  );
};

export default Todo;
