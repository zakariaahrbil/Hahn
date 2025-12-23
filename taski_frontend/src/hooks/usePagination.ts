import { useState } from "react";

interface UsePaginationOptions {
  initialSortBy?: string;
  initialSortDirection?: "asc" | "desc";
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const { initialSortBy = "createdAt", initialSortDirection = "desc" } =
    options;

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSortDirection
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSortChange(
    newSortBy: string,
    newSortDirection: "asc" | "desc"
  ) {
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
    setPage(0);
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setPage(0);
  }

  function nextPage() {
    setPage((p) =>  p + 1);
  }

  function prevPage() {
    setPage((p) => Math.max(0, p - 1));
  }

  return {
    page,
    setPage,
    sortBy,
    sortDirection,
    searchQuery,
    handleSortChange,
    handleSearchChange,
    nextPage,
    prevPage,
  };
};
