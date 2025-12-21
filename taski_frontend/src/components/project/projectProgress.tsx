import { type projectProgressType } from "@/api/projects";
import { Spinner } from "../ui/spinner";

export const ProjectProgress = ({
  progress,
}: {
  progress: projectProgressType | null;
}) => {
  if (!progress) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 bg-white/9 backdrop-blur-lg rounded-2xl px-12 py-4 shadow-xl min-h-50">
        <Spinner className="size-18" />
        <div className="text-white text-sm">Loading Progress...</div>
      </div>
    );
  }

  const percentage = progress.progressPercentage;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-white/9 backdrop-blur-lg rounded-2xl px-12 py-4 shadow-xl">
      <div className="bg-white/20 px-4 py-4 rounded-2xl aspect-square text-center flex items-center justify-center">
        <svg width="80" height="80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#9c35fd"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
            className="transition-all duration-1000 ease-out"
          />
          <text
            x="40"
            y="45"
            textAnchor="middle"
            className="text-sm font-medium"
            fill="white"
          >
            {Math.round(percentage)}%
          </text>
        </svg>
      </div>
      <div className="flex flex-col items-center text-white">
        <h2 className="text-md font-bold">Project Progress</h2>
        <p className="text-sm">
          Total: {progress.totalTasks} | Completed: {progress.completedTasks || 0}
        </p>
      </div>
    </div>
  );
};
