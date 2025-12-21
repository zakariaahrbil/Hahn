import { LucideView } from "lucide-react";
import { CustomLink } from "./customLink";

export const LastProject = () => {
  return (
    <div className="w-full flex flex-col justify-between gap-6 min-h-40 bg-white/9 backdrop-blur-lg rounded-2xl px-6 py-4 mt-8 shadow-xl ">
      <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 text-white">
          <h2 className="text-3xl font-semibold">Hope back in</h2>
          <span>Project Name</span>
        </div>

        <p>
          Date: <span className="font-medium">18-12-2026</span>
        </p>
      </div>

      <div className="w-full flex justify-end">
        <CustomLink link={{ pathname: "/tasks" }}>
          <LucideView className="w-5 h-5" /> View Tasks
        </CustomLink>
      </div>
    </div>
  );
};
