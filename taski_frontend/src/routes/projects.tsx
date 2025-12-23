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
import { LogoutButton } from "@/components/logoutButton";
import { Pagination } from "@/components/pagination";
import { ProjectCard } from "@/components/project/projectCard";
import { ProjectSearch } from "@/components/project/projectSearch";
import { SortControls } from "@/components/sortControls";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { usePagination } from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PROJECT_SORT_OPTIONS = [
  { value: "createdAt", label: "Date Created" },
  { value: "title", label: "Title" },
];

export const Projects = () => {
  const { logout } = useAuth();
  const {
    page,
    sortBy,
    sortDirection,
    searchQuery,
    handleSortChange,
    handleSearchChange,
    nextPage,
    prevPage,
  } = usePagination();

  const [paginatedData, setPaginatedData] = useState<paginatedProjects>({
    projects: [],
    currentPage: 0,
    totalPages: 0,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    projectId: null as number | null,
    projectTitle: "",
  });

  async function loadProjects() {
    try {
      console.log(page)
      const response = await getAllProjects(
        page,
        sortBy,
        sortDirection,
        searchQuery
      );
      setPaginatedData(response);
    } catch {
      toast.error("Failed to load projects");
    }
  }

  const { execute } = useAsyncAction(loadProjects);

  const handleDeleteProject = (id: number, title: string) => {
    setDeleteModal({ isOpen: true, projectId: id, projectTitle: title });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, projectId: null, projectTitle: "" });
  };

  const confirmDelete = async () => {
    if (deleteModal.projectId) {
      await execute(
        () => deleteProject(deleteModal.projectId!),
        "Project deleted successfully.",
        "Failed to delete project."
      );
    }
    closeDeleteModal();
  };

  useEffect(() => {
    loadProjects();
  }, [page, sortBy, sortDirection, searchQuery]);

  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col w-full h-full mx-auto pt-8">
        <div className="flex justify-between gap-4 md:items-start items-center">
          <h1 className="md:text-3xl text-2xl max-w-100 text-left font-normal lg:leading-10">
            Welcome to your <br />
            <span className="italic font-bold">Projects</span> space
          </h1>
          <LogoutButton onLogout={logout} />
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
            sortOptions={PROJECT_SORT_OPTIONS}
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {paginatedData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onDelete={handleDeleteProject}
            />
          ))}
        </section>

        <Pagination
          currentPage={paginatedData.currentPage}
          totalPages={paginatedData.totalPages}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        title={deleteModal.projectTitle}
        onConfirm={confirmDelete}
      />
    </GradientContainer>
  );
};
