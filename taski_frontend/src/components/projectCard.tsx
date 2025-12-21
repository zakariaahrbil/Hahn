import type { listProjectType } from "@/api/projects";
import { ArrowRight, FolderDot } from "lucide-react";
import { Link } from "react-router-dom";

export const ProjectCard = ({ id, title }: listProjectType) => {
  return (
    <div className="bg-white/9 border border-white/50 rounded-2xl p-4 shadow-xl">
      <div className="flex gap-2 mb-4">
        <div className="bg-white/50 rounded-xl p-2 flex justify-center items-center w-fit">
          <FolderDot className="w-8 h-8 text-purple-950" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <p className="text-white/70 text-sm">Project ID: {id}</p>
        </div>
      </div>
      <Link
        to={`/projects/${id}`}
        className="justify-self-end bg-white flex gap-2 items-center text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer w-fit"
      >
        <ArrowRight className="w-5 h-5" />
        View tasks
      </Link>
    </div>
  );
};
