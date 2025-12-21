import { getAllProjects, type projectList } from "@/api/projects";
import { useAuth } from "@/auth/authContext";
import { GradientContainer } from "@/components/gradientContainer";
import { LastProject } from "@/components/lastProject";
import { Search } from "@/components/search";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Projects = () => {
  const [page, setPage] = useState(0);
  const { logout } = useAuth();
  const [projects, setProjects] = useState<projectList>([]);
  const loadProjects = async () => {
    try {
      const response = await getAllProjects(page);
      setProjects(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [page]);

  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col w-full h-full mx-auto pt-8">
        <div className="flex justify-between gap-4 md:items-start items-center">
          <h1 className=" md:text-4xl text-2xl  max-w-100 text-left font-normal  lg:leading-10">
            Welcome to your <span className=" italic font-bold">Projects</span>{" "}
            space
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
        <LastProject />
        <Search />
        <section className="flex gap-2 mt-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/9 text-white p-6 rounded-lg shadow-xl flex-1"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            </div>
          ))}
        </section>
      </div>
    </GradientContainer>
  );
};
