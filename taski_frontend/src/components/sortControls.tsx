import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";

type SortOption = {
  value: string;
  label: string;
};

type SortDirection = "asc" | "desc";

interface SortControlsProps {
  sortBy: string;
  sortDirection: SortDirection;
  onSortChange: (sortBy: string, direction: SortDirection) => void;
  sortOptions: SortOption[];
}

export const SortControls = ({
  sortBy,
  sortDirection,
  onSortChange,
  sortOptions,
}: SortControlsProps) => {
  return (
    <div className="flex items-center gap-2 w-fit">
      <span className="text-white text-sm font-medium">Sort by:</span>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value, sortDirection)}
          className="bg-white/10 border border-white/50 text-white rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-white hover:bg-white/20 active:bg-white/30 appearance-none cursor-pointer transition-colors"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-purple-950 text-white rounded-lg"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => onSortChange(sortBy, "asc")}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            sortDirection === "asc"
              ? "bg-white text-purple-950"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          <ArrowUp />
        </button>
        <button
          onClick={() => onSortChange(sortBy, "desc")}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            sortDirection === "desc"
              ? "bg-white text-purple-950"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          <ArrowDown />
        </button>
      </div>
    </div>
  );
};
