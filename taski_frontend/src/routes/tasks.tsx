import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, FolderArchive } from "lucide-react";
import { GradientContainer } from "@/components/gradientContainer";
import { CreateTask } from "@/components/task/createTask";
import { TaskSearch } from "@/components/task/taskSearch";
import { SortControls } from "@/components/sortControls";
import { TaskCard } from "@/components/task/taskCard";
import { ProjectProgress } from "@/components/project/projectProgress";
import { LogoutButton } from "@/components/logoutButton";
import { Pagination } from "@/components/pagination";
import { useAuth } from "@/auth/authContext";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { usePagination } from "@/hooks/usePagination";
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

const TASK_SORT_OPTIONS = [
  { value: "created_at", label: "Date Created" },
  { value: "title", label: "Title" },
  { value: "deadline", label: "Deadline" },
];

export const Tasks = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { logout } = useAuth();
  const router = useNavigate();

  const {
    page,
    sortBy,
    sortDirection,
    searchQuery,
    handleSortChange,
    handleSearchChange,
    nextPage,
    prevPage,
  } = usePagination({ initialSortBy: "created_at" });

  const [project, setProject] = useState<projectType | null>(null);
  const [progress, setProgress] = useState<projectProgressType | null>(null);
  const [paginatedData, setPaginatedData] = useState<paginatedTasks>({
    tasks: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function loadTasks() {
    try {
      const response = await getAllTasks(
        projectId,
        page,
        sortBy,
        sortDirection,
        searchQuery
      );
      setPaginatedData(response);
    } catch {
      toast.error("Failed to load tasks");
    }
  }

  async function loadProgress() {
    try {
      const data = await getProjectProgress(projectId);
      setProgress(data);
    } catch {
      setProgress({ progressPercentage: 0, totalTasks: 0, completedTasks: 0 });
      toast.error("Failed to load project progress");
    }
  }

  function refreshData() {
    loadTasks();
    loadProgress();
  }

  const { execute } = useAsyncAction(refreshData);

  async function loadProject() {
    try {
      const response = await getProjectById(projectId);
      setProject(response);
      localStorage.setItem("LastProject", JSON.stringify(response));
    } catch {
      router("/not-found", { replace: true });
    }
  }

  const handleStatusChange = async (taskId: number) => {
    await execute(
      () => changeTaskStatus(projectId, taskId),
      "Task status updated.",
      "Failed to update task status."
    );
  };

  const handleDelete = async (taskId: number) => {
    await execute(
      () => deleteTask(projectId, taskId),
      "Task deleted.",
      "Failed to delete task."
    );
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await Promise.all([loadProject(), loadProgress(), loadTasks()]);
      setIsLoading(false);
    };
    initializeData();
  }, [projectId]);

  useEffect(() => {
    if (!isLoading) {
      loadTasks();
    }
  }, [page, sortBy, sortDirection, searchQuery]);

  if (isLoading) {
    return <Loading />;
  }

  if (!project) return null;

  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col w-full h-full mx-auto pt-8">
        <div className="flex flex-col justify-between gap-4 md:items-start items-center">
          <div className="flex gap-4 justify-between w-full">
            <Link
              to="/projects"
              className="flex items-center gap-2 text-white hover:text-white/80"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <LogoutButton onLogout={logout} />
          </div>
          <div className="flex gap-4 justify-between w-full">
            <div>
              <h1 className="md:text-3xl text-2xl max-w-100 text-left font-normal lg:leading-10">
                Tasks for <br />
                {project.title}
              </h1>
              <p className="font-light">
                Created:{" "}
                <span className="font-medium">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            {project.description && (
              <p className="text-sm max-w-xl text-justify">
                {project.description.length > 150
                  ? `${project.description.substring(0, 150)}...`
                  : project.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row max-sm:flex-col-reverse md:gap-8 gap-2 mt-8">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-between gap-4 w-full">
              <TaskSearch onSearchChange={handleSearchChange} />
              <div className="md:w-auto">
                <SortControls
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSortChange={handleSortChange}
                  sortOptions={TASK_SORT_OPTIONS}
                />
              </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {paginatedData.tasks.length === 0 && !searchQuery ? (
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

            {paginatedData.tasks.length !== 0 && (
              <Pagination
                currentPage={paginatedData.currentPage}
                totalPages={paginatedData.totalPages}
                onPrevious={prevPage}
                onNext={nextPage}
              />
            )}
          </div>

          <div className="md:w-80 space-y-4">
            <ProjectProgress progress={progress} />
            <CreateTask refreshData={refreshData} projectId={projectId} />
          </div>
        </div>
      </div>
    </GradientContainer>
  );
};
