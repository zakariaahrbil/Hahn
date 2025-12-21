import { useForm } from "react-hook-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { LayersPlusIcon } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { createProject, type createProjectType } from "@/api/projects";
import { useState } from "react";
import { toast } from "sonner";

export const CreateProjectDrawer = ({
  loadProjects,
}: {
  loadProjects: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<createProjectType>();

  const onSubmit = async (data: createProjectType) => {
    setIsSubmitting(true);
    try {
      await createProject(data);
      toast("Project has been created.", {
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
      reset();
      loadProjects();
    } catch (err: any) {
      setError("root", { message: err.message || "Failed to create project" });
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="bg-white/20 p-4 rounded-2xl cursor-pointer">
          <LayersPlusIcon className="w-12 h-12 text-white" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-linear-to-tl to-[#9c35fd] via-[#29004f] from-[#10001f]  text-white min-h-100 rounded-t-2xl shadow-2xl w-screen">
        <DrawerHeader>
          <DrawerTitle className="text-4xl">Create New Project</DrawerTitle>
          <DrawerDescription>
            Fill in the details to create your project.
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full max-w-200 flex flex-col justify-center items-center mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 flex flex-col gap-4 w-full "
          >
            <div className="flex flex-col">
              <label className="font-medium mb-2">Title</label>
              <input
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 100,
                    message: "Title must be less than 100 characters",
                  },
                })}
                placeholder="Project title"
                className={`px-4 py-2 rounded-lg focus:outline-none border  ${
                  errors.title
                    ? "border-red-400"
                    : "border-white/50 focus:border-white"
                } bg-white/10 text-white`}
              />
              {errors.title && (
                <p className="text-red-400 mt-1">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 500,
                    message: "Description must be less than 500 characters",
                  },
                })}
                placeholder="Project description"
                className={`px-4 py-2 rounded-lg focus:outline-none border ${
                  errors.description
                    ? "border-red-400"
                    : "border-white/50 focus:border-white"
                } bg-white/10 text-white resize-none`}
                rows={4}
              />
              {errors.description && (
                <p className="text-red-400 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            {errors.root && (
              <p className="text-red-400">{errors.root.message}</p>
            )}
          </form>
          <DrawerFooter className="w-full">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-white text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer disabled:bg-white/70"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
            <DrawerClose asChild>
              <button className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 cursor-pointer">
                Cancel
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
