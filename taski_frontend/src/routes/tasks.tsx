import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, ArrowLeft, CheckCircle, FolderArchive } from "lucide-react";
import { GradientContainer } from "@/components/gradientContainer";
import { CreateTask } from "@/components/task/createTask";
import { TaskSearch } from "@/components/task/taskSearch";
import { SortControls } from "@/components/sortControls";
import { TaskCard } from "@/components/task/taskCard";
import { ProjectProgress } from "@/components/project/projectProgress";
import { useAuth } from "@/auth/authContext";
import {
  getAllTasks,
  changeTaskStatus,
  deleteTask,
  type paginatedTasks,
} from "@/api/tasks";
import {
  getProjectById,
  getProjectProgress,
  type projectProgressType,
  type projectType,
} from "@/api/projects";
import { Loading } from "@/components/loading";

export const Tasks = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { logout } = useAuth();
  const router = useNavigate();
  const [page, setPage] = useState(0);
  const [project, setProject] = useState<projectType | null>(null);
  const [progress, setProgress] = useState<projectProgressType | null>(null);
  const [paginatedData, setPaginatedData] = useState<paginatedTasks>({
    tasks: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const taskSortOptions = [
    { value: "created_at", label: "Date Created" },
    { value: "title", label: "Title" },
    { value: "deadline", label: "Deadline" },
  ];
  const loadTasks = async () => {
    try {
      const response = await getAllTasks(
        projectId,
        page,
        sortBy,
        sortDirection,
        searchQuery
      );
      setPaginatedData(response);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  const loadProject = async () => {
    try {
      const response = await getProjectById(projectId);
      setProject(response);
      localStorage.setItem("LastProject", JSON.stringify(response));
    } catch (err) {
      router("/not-found", { replace: true });
    }
  };

  const handleAsyncAction = async (
    action: () => Promise<void>,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      await action();
      loadTasks();
      loadProgress();
      toast(successMessage, {
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
      toast(errorMessage, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
        },
      });
    }
  };

  const handleStatusChange = async (taskId: number) => {
    await handleAsyncAction(
      () => changeTaskStatus(projectId, taskId),
      "Task status updated.",
      "Failed to update task status."
    );
  };

  const handleDelete = async (taskId: number) => {
    await handleAsyncAction(
      () => deleteTask(projectId, taskId),
      "Task deleted.",
      "Failed to delete task."
    );
  };

  const loadProgress = async () => {
    try {
      const data = await getProjectProgress(projectId);
      setProgress(data);
    } catch (err) {
      setProgress({ progressPercentage: 0, totalTasks: 0, completedTasks: 0 });
      toast.error("Failed to load project progress");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (
    newSortBy: string,
    newSortDirection: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
    setPage(0);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(0); 
  };

  useEffect(() => {
    setIsLoading(true);
    loadProgress();
    loadProject();
  }, [projectId]);

  useEffect(() => {
    loadTasks();
  }, [page, sortBy, sortDirection, searchQuery]);

  if (isLoading) {
    return <Loading />;
  } else if (project) {
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
              <p className="font-light">
                Created:{" "}
                <span className="font-medium">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </p>
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
          <div className="flex flex-col md:flex-row max-sm:flex-col-reverse md:gap-8 gap-2 mt-8">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-between gap-4 w-full">
                <TaskSearch
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                />
                <div className="md:w-auto">
                  <SortControls
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSortChange={handleSortChange}
                    sortOptions={taskSortOptions}
                  />
                </div>
              </div>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
                {paginatedData.tasks.length === 0 ? (
                  <div className="col-span-full text-center text-white py-12">
                    <FolderArchive className="w-24 h-24 mx-auto mb-4 text-white/70" />
                    <h2 className="text-2xl font-bold mb-2">No tasks yet</h2>
                    <p className="text-white/70">
                      Create your first task to get started on this project.
                    </p>
                  </div>
                ) : (
                  paginatedData.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      {...task}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </section>
              {paginatedData.tasks.length != 0 && (
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
              )}
            </div>
            <div className="md:w-80 space-y-4">
              <ProjectProgress progress={progress} />
              <CreateTask loadTasks={loadTasks} projectId={projectId} />
            </div>
          </div>
        </div>
      </GradientContainer>
    );
  }
};
