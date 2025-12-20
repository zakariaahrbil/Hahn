import { LogIn } from "lucide-react";
import { CustomLink } from "./customLink";

export const NavBar = () => {
  return (
    <nav className="w-full flex justify-between bg-white/9 backdrop-blur-md items-center py-4 px-8 mt-4 rounded-2xl shadow-xl">
      <span className="text-2xl font-bold text-white italic">Taski</span>
      <CustomLink link={{ pathname: "/login" }}>
        <LogIn className="h-5 w-5" /> Login
      </CustomLink>
    </nav>
  );
};
