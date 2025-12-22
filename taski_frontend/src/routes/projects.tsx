import {
  getAllProjects,
  type paginatedProjects,
  deleteProject,
} from "@/api/projects";
import { useAuth } from "@/auth/authContext";
import { ConfirmDeleteModal } from "@/components/project/confirmDeleteModal";
import { CreateProject } from "@/components/project/createProject";
import { GradientContainer } from "@/components/gradientContainer";
import { LastProject } from "@/components/project/lastProject";
import { ProjectCard } from "@/components/project/projectCard";
import { ProjectSearch } from "@/components/project/projectSearch";
import { SortControls } from "@/components/sortControls";
import { LogOut, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const Projects = () => {
  const [page, setPage] = useState(0);
  const { logout } = useAuth();
  const [paginatedData, setPaginatedData] = useState<paginatedProjects>({
    projects: [],
    currentPage: 0,
    totalPages: 0,
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    projectId: number | null;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: null,
    projectTitle: "",
  });
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const projectSortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "title", label: "Title" },
  ];

  const handleAsyncAction = async (
    action: () => Promise<void>,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      await action();
      loadProjects();
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

  const loadProjects = async () => {
    try {
      const response = await getAllProjects(
        page,
        sortBy,
        sortDirection,
        searchQuery
      );
      setPaginatedData(response);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  };

  const handleDeleteProject = (id: number, title: string) => {
    setDeleteModal({
      isOpen: true,
      projectId: id,
      projectTitle: title,
    });
  };

  const confirmDelete = async () => {
    if (deleteModal.projectId) {
      await handleAsyncAction(
        () => deleteProject(deleteModal.projectId!),
        "Project deleted successfully.",
        "Failed to delete project."
      );
    }
    setDeleteModal({ isOpen: false, projectId: null, projectTitle: "" });
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
    loadProjects();
  }, [page, sortBy, sortDirection, searchQuery]);

  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col w-full h-full mx-auto pt-8 ">
        <div className="flex justify-between gap-4 md:items-start items-center">
          <h1 className=" md:text-3xl text-2xl  max-w-100 text-left font-normal  lg:leading-10">
            Welcome to your <br />
            <span className=" italic font-bold">Projects</span> space
          </h1>
          <Link
            onClick={logout}
            to="/login"
            className="bg-white flex gap-2 items-center text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <LastProject />
          <CreateProject loadProjects={loadProjects} />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4 w-full">
          <ProjectSearch onSearchChange={handleSearchChange} />
          <SortControls
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            sortOptions={projectSortOptions}
          />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
          {paginatedData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onDelete={handleDeleteProject}
            />
          ))}
        </section>
        <div className="flex justify-center items-center gap-4 mt-6 mb-12">
          <button
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
            disabled={paginatedData.currentPage === 0}
            className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-white">
            Page {paginatedData.currentPage + 1} of {paginatedData.totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={paginatedData.currentPage >= paginatedData.totalPages - 1}
            className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, projectId: null, projectTitle: "" })
        }
        title={deleteModal.projectTitle}
        onConfirm={confirmDelete}
      />
    </GradientContainer>
  );
};
