import { Eye, FolderArchive } from "lucide-react";
import { CustomLink } from "../customLink";
import { useEffect, useState } from "react";
import type { projectType } from "@/api/projects";
import { Spinner } from "../ui/spinner";

export const LastProject = () => {
  const [project, setProject] = useState<projectType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedProject = localStorage.getItem("LastProject");
    if (storedProject) {
      setProject(JSON.parse(storedProject));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-6 bg-white/9 backdrop-blur-lg rounded-2xl px-6 py-4 mt-8 shadow-xl">
        <Spinner className="size-24" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-6 bg-white/9 backdrop-blur-lg rounded-2xl px-6 py-4 mt-8 shadow-xl">
        <div className="flex flex-col items-center text-white">
          <FolderArchive className="w-18 h-18 mx-auto mb-4 text-white/70" />
          <h2 className="text-md font-bold">No Recent Project</h2>
          <span className="text-sm">Start by visitin a project</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-between gap-6 bg-white/9 backdrop-blur-lg rounded-2xl px-6 py-4 mt-8 shadow-xl">
      <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 text-white">
          <h2 className="text-2xl font-semibold">Hop back in</h2>
          <span>{project.title}</span>
        </div>

        <p className="font-light">
          Created:{" "}
          <span className="font-medium">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>

      <div className="w-full flex justify-end">
        <CustomLink
          link={{
            pathname: `/projects/${project.id}/tasks`,
          }}
        >
          <Eye className="w-5 h-5" /> View Tasks
        </CustomLink>
      </div>
    </div>
  );
};
