import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, ArrowLeft, CheckCircle } from "lucide-react";
import { GradientContainer } from "@/components/gradientContainer";
import { CreateTask } from "@/components/task/createTask";
import { TaskSearch } from "@/components/task/taskSearch";
import { TotalTasks } from "@/components/task/totalTasks";
import { TaskCard } from "@/components/task/taskCard";
import { useAuth } from "@/auth/authContext";
import {
  getAllTasks,
  changeTaskStatus,
  deleteTask,
  type paginatedTasks,
} from "@/api/tasks";
import { getProjectById, type projectType } from "@/api/projects";

export const Tasks = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { logout } = useAuth();
  const [page, setPage] = useState(0);
  const [project, setProject] = useState<projectType | null>(null);
  const [paginatedData, setPaginatedData] = useState<paginatedTasks>({
    tasks: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const loadTasks = async () => {
    try {
      const response = await getAllTasks(projectId, page);
      setPaginatedData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProject = async () => {
    try {
      const response = await getProjectById(projectId);
      setProject(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [page]);

  useEffect(() => {
    loadProject();
  }, []);

  const handleStatusChange = async (taskId: number) => {
    try {
      await changeTaskStatus(projectId, taskId);
      loadTasks();
      toast("Task status updated.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#9c35fd",
          color: "white",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
        },
        icon: <CheckCircle className="w-5 h-5" />,
      });
    } catch (err) {
      toast.error("Failed to update task status.");
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(projectId, taskId);
      loadTasks();
      toast("Task deleted.");
    } catch (err) {
      toast("Failed to delete task.");
    }
  };

  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col w-full h-full mx-auto pt-8 ">
        <div className="flex justify-between gap-4 md:items-start items-center">
          <div className="flex flex-col gap-2">
            <Link
              to="/projects"
              className="flex items-center gap-2 text-white hover:text-white/80"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <h1 className=" md:text-3xl text-2xl  max-w-100 text-left font-normal  lg:leading-10">
              Tasks for <br />
              {project?.title || "Loading..."}
            </h1>
          </div>
          <Link
            onClick={logout}
            to="/login"
            className="bg-white flex gap-2 items-center text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-1">
            <TaskSearch />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
              {paginatedData.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </section>
            <div className="flex justify-center items-center gap-4 mt-6 mb-12">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-white">
                Page {paginatedData.currentPage + 1} of{" "}
                {paginatedData.totalPages}
              </span>
              <button
                onClick={() =>
                  setPage(Math.min(paginatedData.totalPages - 1, page + 1))
                }
                disabled={page >= paginatedData.totalPages - 1}
                className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
          <div className="md:w-80 space-y-4">
            <TotalTasks total={paginatedData.totalElements} />
            <CreateTask loadTasks={loadTasks} projectId={projectId} />
          </div>
        </div>
      </div>
    </GradientContainer>
  );
};
