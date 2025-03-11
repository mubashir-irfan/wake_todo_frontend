'use client';

import { Task } from '@/types';
import Todo from './Todo';

interface TodoListProps {
  tasks: Task[];
  onMarkTaskComplete: (id: number) => void;
  onMarkTaskIncomplete: (id: number) => void;
  onDelete: (id: number) => void;
  onDoubleClickTask: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onMarkTaskComplete, onMarkTaskIncomplete, onDelete, onDoubleClickTask }) => {
  return (
    <div className="space-y-2 shadow-lg">
      {tasks.map((task, index) => (
        <div key={task.id}>
          {index > 0 && <hr className="border-t border-gray-300" />}
          <Todo
            task={task}
            onMarkComplete={onMarkTaskComplete}
            onMarkIncomplete={onMarkTaskIncomplete}
            onDelete={onDelete}
            onDoubleClick={onDoubleClickTask}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;