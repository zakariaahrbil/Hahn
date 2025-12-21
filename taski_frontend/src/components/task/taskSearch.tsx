import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface TaskSearchProps {
  onSearchChange: (query: string) => void;
}

export const TaskSearch = ({
  onSearchChange,
}: TaskSearchProps) => {
  const [localQuery, setLocalQuery] = useState("");
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  return (
    <div className="md:flex-1 w-full flex min-w-80 items-center border border-white/50 focus-within:border-white bg-white/10 text-white rounded-xl max-sm:mt-4 px-4 py-2 shadow-xl">
      <SearchIcon className="w-5 h-5 text-white" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="px-4 py-2 rounded-lg focus:outline-none w-full bg-transparent text-white placeholder-white/70"
      />
    </div>
  );
};
