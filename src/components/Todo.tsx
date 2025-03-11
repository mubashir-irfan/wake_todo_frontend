import { Task } from "@/types";
import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";

interface TodoProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ task, onToggleComplete, onDelete }) => {
  if (task.deleted) return null; // Hide deleted tasks

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border">
      {/* Check/Uncheck Button */}
      <button onClick={() => onToggleComplete(task.id)} className="text-blue-600">
        {task.completed ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
      </button>

      {/* Task Name */}
      <span className={`flex-1 mx-3 ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
        {task.text}
      </span>

      {/* Delete Button */}
      <button onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-800">
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default Todo;
