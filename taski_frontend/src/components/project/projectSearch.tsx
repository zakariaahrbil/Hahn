import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectSearchProps {
  onSearchChange: (query: string) => void;
}

export const ProjectSearch = ({
  onSearchChange,
}: ProjectSearchProps) => {
  const [localQuery, setLocalQuery] = useState("");
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="md:flex-1 w-full flex items-center border border-white/50 focus-within:border-white bg-white/10 text-white rounded-xl px-4 py-2 shadow-xl">
      <SearchIcon className="w-5 h-5 text-white" />
      <input
        type="text"
        placeholder="Search projects..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="px-4 py-2 rounded-lg focus:outline-none w-full bg-transparent text-white placeholder-white/70"
      />
    </div>
  );
};
