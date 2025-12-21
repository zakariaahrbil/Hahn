import { CreateTaskDrawer } from "./createTaskDrawer";

export const CreateTask = ({
  loadTasks,
  projectId,
}: {
  loadTasks: () => Promise<void>;
  projectId: number;
}) => {
  return (
    <div className=" flex flex-col justify-center items-center gap-2  bg-white/9 backdrop-blur-lg rounded-2xl px-12 py-4 shadow-xl ">
      <CreateTaskDrawer loadTasks={loadTasks} projectId={projectId} />
      <div className="flex flex-col items-center text-white">
        <h2 className="text-md font-bold">Create New Task</h2>
        <span className="text-sm">Add a task to this project</span>
      </div>
    </div>
  );
};