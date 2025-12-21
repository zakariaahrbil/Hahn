import type { taskType } from "@/api/tasks";
import { CheckCircle, Circle, Trash2 } from "lucide-react";

interface TaskCardProps extends taskType {
  onStatusChange: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

export const TaskCard = ({
  id,
  title,
  description,
  state,
  deadline,
  onStatusChange,
  onDelete,
}: TaskCardProps) => {
  const isCompleted = state === "COMPLETED";
  state = isCompleted ? "COMPLETED" : "PENDING";

  return (
    <div className="bg-white/9 border border-white/50 rounded-2xl p-4 shadow-xl">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onStatusChange(id)}
            className="text-white hover:text-green-400 cursor-pointer"
          >
            {isCompleted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-white hover:text-red-400 cursor-pointer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-white/70 text-sm mb-2">{description}</p>
      <p className="text-white/50 text-xs">
        Deadline: {new Date(deadline).toLocaleDateString()}
      </p>
      {isCompleted ? <p className="bg-purple-600 px-2 py-1 mt-4 rounded-md w-fit text-xs font-medium">Completed</p> : 
      <p className="bg-purple-300 text-purple-950 px-2 py-1 mt-4 rounded-md w-fit text-xs font-medium">Pending</p>}
    </div>
  );
};
