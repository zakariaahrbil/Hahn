import { getAllProjects, type paginatedProjects } from "@/api/projects";
import { useAuth } from "@/auth/authContext";
import { CreateProject } from "@/components/createProject";
import { GradientContainer } from "@/components/gradientContainer";
import { LastProject } from "@/components/lastProject";
import { ProjectCard } from "@/components/projectCard";
import { Search } from "@/components/search";
import { TotalProjects } from "@/components/totalProjects";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Projects = () => {
  const [page, setPage] = useState(0);
  const { logout } = useAuth();
  const [paginatedData, setPaginatedData] = useState<paginatedProjects>({
    projects: [],
    currentPage: 0,
    totalPages: 0,
  });
  const loadProjects = async () => {
    try {
      const response = await getAllProjects(page);
      setPaginatedData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [page]);

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
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <LastProject />
          <TotalProjects />
          <CreateProject loadProjects={loadProjects} />
        </div>
        <Search />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
          {paginatedData.projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </section>
        <div className="flex justify-center items-center gap-4 mt-6 mb-12">
          <button
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
            disabled={paginatedData.currentPage === 0}
            className="bg-white text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 disabled:bg-white/50 cursor-pointer disabled:cursor-auto"
          >
            Previous
          </button>
          <span className="text-white">
            Page {paginatedData.currentPage + 1} of {paginatedData.totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={paginatedData.currentPage >= paginatedData.totalPages - 1}
            className="bg-white text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 disabled:bg-white/50 cursor-pointer disabled:cursor-auto"
          >
            Next
          </button>
        </div>
      </div>
    </GradientContainer>
  );
};
