import { SearchIcon } from "lucide-react";

interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TaskSearch = ({
  searchQuery,
  onSearchChange,
}: TaskSearchProps) => {
  return (
    <div className="md:flex-1 w-full flex min-w-80 items-center border border-white/50 focus-within:border-white bg-white/10 text-white rounded-xl max-sm:mt-4 px-4 py-2 shadow-xl">
      <SearchIcon className="w-5 h-5 text-white" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-4 py-2 rounded-lg focus:outline-none w-full bg-transparent text-white placeholder-white/70"
      />
    </div>
  );
};
