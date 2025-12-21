import type { listProjectType } from "@/api/projects";
import {FolderDot, LucideView, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const ProjectCard = ({
  id,
  title,
  onDelete,
}: listProjectType & { onDelete?: (id: number, title: string) => void }) => {
  return (
    <div className="bg-white/9 border border-white/50 rounded-2xl p-4 shadow-xl relative">
      <div className="flex gap-2 items-start justify-between mb-6">
        <div className="flex gap-2 ">
          <div className="bg-white/50 rounded-xl p-2 flex justify-center items-center w-fit">
            <FolderDot className="w-8 h-8 text-purple-950" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-white text-lg font-semibold">{title}</h2>
            <p className="text-white/70 text-sm">Project ID: {id}</p>
          </div>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(id, title)}
            className="text-white hover:text-red-400 cursor-pointer"
            title="Delete project"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
      <Link
        to={`/projects/${id}/tasks`}
        className="justify-self-end bg-white flex gap-2 items-center text-purple-950 p-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer w-fit"
      >
        <LucideView className="w-5 h-5" />
      </Link>
    </div>
  );
};
