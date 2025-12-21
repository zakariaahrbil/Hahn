import { SearchIcon } from "lucide-react"

export const TaskSearch = () => {
  return (
    <div className="w-full flex  items-center border border-white/50 focus:border-white bg-white/10 text-white rounded-xl max-sm:mt-4 px-4 py-2 shadow-xl">
      <SearchIcon className="w-5 h-5 text-white" />
      <input
        type="text"
        placeholder="Search tasks..."
        className="px-4 py-2 rounded-lg focus:outline-none w-full"
      />
    </div>
  );
}