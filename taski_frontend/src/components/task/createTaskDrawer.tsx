import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { createTask, type createTaskType } from "@/api/tasks";
import { LayersPlusIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";

export const CreateTaskDrawer = ({
  loadTasks,
  projectId,
}: {
  loadTasks: () => Promise<void>;
  projectId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createTaskType>();

  const onSubmit = async (data: createTaskType) => {
    setIsSubmitting(true);
    try {
      const taskData = { ...data, deadline: data.deadline + "T00:00:00" };
      await createTask(projectId, taskData);
      toast("Task has been created.", {
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
      loadTasks();
    } catch (err: any) {
      toast.error("Failed to create task");
    } finally {
      reset();
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            color: white;
            background: transparent;
            filter: invert(1);
          }
          input[type="date"]::-moz-calendar-picker-indicator {
            color: white;
            background: transparent;
            filter: invert(1);
          }
        `}
      </style>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className="bg-white/20 p-4 rounded-2xl cursor-pointer">
            <LayersPlusIcon className="w-12 h-12 text-white" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-linear-to-tl to-[#9c35fd] via-[#29004f] from-[#10001f]  text-white min-h-100 rounded-t-2xl shadow-2xl border-none w-screen">
          <DrawerHeader>
            <DrawerTitle className="text-4xl">Create New Task</DrawerTitle>
            <DrawerDescription>
              Fill in the details to create your task.
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full max-w-200 flex flex-col justify-center items-center mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-4 flex flex-col gap-4 w-full"
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
                  placeholder="Task title"
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
                  placeholder="Task description"
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
              <div className="flex flex-col">
                <label className="font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  {...register("deadline", {
                    required: "Deadline is required",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      if (selectedDate < today) {
                        return "Deadline cannot be in the past";
                      }
                      return true;
                    },
                  })}
                  className={`px-4 py-2 rounded-lg focus:outline-none border ${
                    errors.deadline
                      ? "border-red-400"
                      : "border-white/50 focus:border-white"
                  } bg-white/10 text-white`}
                />
                {errors.deadline && (
                  <p className="text-red-400 mt-1">{errors.deadline.message}</p>
                )}
              </div>
              <DrawerFooter className="w-full p-0 ">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="flex justify-center items-center gap-2 bg-white text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer 
                 disabled:bg-white/70"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="size-4" />
                      Creating...
                    </>
                  ) : (
                    "Create Task"
                  )}
                </button>
                <DrawerClose asChild>
                  <button className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 cursor-pointer mb-4">
                    Cancel
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
