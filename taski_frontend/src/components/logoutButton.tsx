import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => (
  <Link
    onClick={onLogout}
    to="/login"
    className="bg-white flex gap-2 items-center text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer"
  >
    <LogOut className="h-5 w-5" />
    Logout
  </Link>
);
