import { CreateProjectDrawer } from "./createProjectDrawer";

export const CreateProject = ({
  loadProjects,
}: {
  loadProjects: () => Promise<void>;
}) => {
  return (
    <div className=" flex flex-col justify-center items-center gap-2  bg-white/9 backdrop-blur-lg rounded-2xl px-12 py-4 shadow-xl w-full">
      <CreateProjectDrawer loadProjects={loadProjects} />
      <div className="flex flex-col items-center text-white">
        <h2 className="text-md font-bold">Create New Project</h2>
        <span className="text-sm">Start organizing your tasks</span>
      </div>
    </div>
  );
};
