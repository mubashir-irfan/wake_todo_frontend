import { Task } from "@/types";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

interface TodoProps {
  task: Task;
  onMarkComplete: (id: number) => void;
  onMarkIncomplete: (id: number) => void;
  onDelete: (id: number) => void;
  onDoubleClick: (task: Task) => void;
}

const Todo: React.FC<TodoProps> = ({ task, onMarkComplete, onMarkIncomplete, onDelete, onDoubleClick }) => {
  const handleComplete = () => {
    onMarkComplete(task.id);
  };

  const handleIncomplete = () => {
    onMarkIncomplete(task.id);
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 cursor-pointer hover:bg-gray-100" onDoubleClick={() => onDoubleClick(task)}>
      <button onClick={task.completed ? handleIncomplete : handleComplete} className={`cursor-pointer ${task.completed ? 'text-black-600' : 'opacity-25'} `}>

        <FaCheckCircle size={20} />
      </button>

      <span className={`flex-1 mx-3 text-gray-800 ${task.completed ? "line-through" : ""}`}>
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-800 cursor-pointer">
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default Todo;