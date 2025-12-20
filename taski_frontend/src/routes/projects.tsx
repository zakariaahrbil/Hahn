import { GradientContainer } from "@/components/gradientContainer";
import { LastProject } from "@/components/lastProject";
import { Search } from "@/components/search";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const Projects = () => {
  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col w-full h-full mx-auto pt-8">
        <div className="flex justify-between gap-4 md:items-start items-center">
          <h1 className=" md:text-4xl text-2xl  max-w-100 text-left font-normal  lg:leading-10">
            Welcome to your <span className=" italic font-bold">Projects</span>{" "}
            space
          </h1>
          <Link
            to="/login"
            className="bg-white flex gap-2 items-center text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
        <LastProject />
        <Search />
      </div>
    </GradientContainer>
  );
};
